#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${AWS_REGION:-}" ]]; then
  echo "AWS_REGION is required"
  exit 1
fi

if [[ -z "${CDK_STACK_NAME:-}" ]]; then
  echo "CDK_STACK_NAME is required"
  exit 1
fi

CF_DATA_LIMIT_MB="${FREE_TIER_CF_DATA_MB_LIMIT:-10240}"
CF_REQUEST_LIMIT="${FREE_TIER_CF_REQUEST_LIMIT:-1000000}"
BLOCK_PERCENT="${FREE_TIER_GUARD_BLOCK_PERCENT:-85}"

STACK_EXISTS="false"
if aws cloudformation describe-stacks --stack-name "$CDK_STACK_NAME" --region "$AWS_REGION" >/dev/null 2>&1; then
  STACK_EXISTS="true"
fi

if [[ "$STACK_EXISTS" != "true" ]]; then
  echo "Stack $CDK_STACK_NAME does not exist yet; skipping free-tier guardrail check for first deployment."
  exit 0
fi

DIST_ID="$(aws cloudformation describe-stacks \
  --stack-name "$CDK_STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue | [0]" \
  --output text)"

if [[ -z "$DIST_ID" || "$DIST_ID" == "None" ]]; then
  echo "Could not resolve CloudFrontDistributionId output; failing guardrail check."
  exit 1
fi

START_TIME="$(date -u +%Y-%m-01T00:00:00Z)"
END_TIME="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

BYTES_JSON="$(aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name BytesDownloaded \
  --start-time "$START_TIME" \
  --end-time "$END_TIME" \
  --period 86400 \
  --statistics Sum \
  --dimensions Name=DistributionId,Value="$DIST_ID" Name=Region,Value=Global \
  --region us-east-1 \
  --output json)"

REQUESTS_JSON="$(aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --start-time "$START_TIME" \
  --end-time "$END_TIME" \
  --period 86400 \
  --statistics Sum \
  --dimensions Name=DistributionId,Value="$DIST_ID" Name=Region,Value=Global \
  --region us-east-1 \
  --output json)"

read -r DATA_MB REQUESTS_COUNT DATA_PERCENT REQUESTS_PERCENT <<EOF
$(BYTES_JSON="$BYTES_JSON" REQUESTS_JSON="$REQUESTS_JSON" CF_DATA_LIMIT_MB="$CF_DATA_LIMIT_MB" CF_REQUEST_LIMIT="$CF_REQUEST_LIMIT" python - <<'PY'
import json
import os

bytes_data = json.loads(os.environ["BYTES_JSON"])
requests_data = json.loads(os.environ["REQUESTS_JSON"])

bytes_total = sum(dp.get("Sum", 0.0) for dp in bytes_data.get("Datapoints", []))
requests_total = sum(dp.get("Sum", 0.0) for dp in requests_data.get("Datapoints", []))

mb_total = bytes_total / (1024 * 1024)
mb_limit = float(os.environ.get("CF_DATA_LIMIT_MB", "10240"))
req_limit = float(os.environ.get("CF_REQUEST_LIMIT", "1000000"))

mb_pct = (mb_total / mb_limit * 100.0) if mb_limit > 0 else 0.0
req_pct = (requests_total / req_limit * 100.0) if req_limit > 0 else 0.0

print(f"{mb_total:.2f} {requests_total:.0f} {mb_pct:.2f} {req_pct:.2f}")
PY)
EOF

echo "CloudFront month-to-date usage for $DIST_ID"
echo "- Data transfer: ${DATA_MB} MB / ${CF_DATA_LIMIT_MB} MB (${DATA_PERCENT}%)"
echo "- Requests: ${REQUESTS_COUNT} / ${CF_REQUEST_LIMIT} (${REQUESTS_PERCENT}%)"

data_block="$(DATA_PERCENT="$DATA_PERCENT" BLOCK_PERCENT="$BLOCK_PERCENT" python - <<'PY'
import os
print("true" if float(os.environ["DATA_PERCENT"]) >= float(os.environ["BLOCK_PERCENT"]) else "false")
PY)"

request_block="$(REQUESTS_PERCENT="$REQUESTS_PERCENT" BLOCK_PERCENT="$BLOCK_PERCENT" python - <<'PY'
import os
print("true" if float(os.environ["REQUESTS_PERCENT"]) >= float(os.environ["BLOCK_PERCENT"]) else "false")
PY)"

if [[ "$data_block" == "true" || "$request_block" == "true" ]]; then
  echo "Free-tier guardrail block: usage has reached ${BLOCK_PERCENT}% threshold."
  exit 1
fi

echo "Free-tier guardrail check passed."
