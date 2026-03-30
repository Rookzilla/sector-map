# AWS OIDC Setup for GitHub Actions (Sector Map)

This project deploys with GitHub Actions assuming an IAM role in AWS via OIDC.
You can create that OIDC provider + role directly with CDK (recommended), then let Actions deploy normally.

## Fixed values

- AWS account: `905418205737`
- Region: `eu-west-2`
- Stack name: `SectorMapProdStack`
- IAM role name used by workflow: `GitHubActionsCdkDeployRole`

## 1) Bootstrap OIDC + deploy role with CDK

Run once from a local terminal with admin credentials:

```bash
export AWS_ACCOUNT_ID=905418205737
export AWS_REGION=eu-west-2
export OIDC_BOOTSTRAP_STACK_NAME=SectorMapGitHubOidcBootstrapStack
export GITHUB_REPO_OWNER=<OWNER>
export GITHUB_REPO_NAME=sector-map
export GITHUB_ACTIONS_DEPLOY_ROLE_NAME=GitHubActionsCdkDeployRole
export CREATE_GITHUB_OIDC_PROVIDER=true

yarn --cwd cdk install
yarn cdk:deploy:oidc-bootstrap
```

Notes:
- Replace `<OWNER>` with your GitHub user/org.
- If your account already has the GitHub OIDC provider, set `CREATE_GITHUB_OIDC_PROVIDER=false`.
- The stack deploys trust to `repo:<OWNER>/sector-map:ref:refs/heads/main`.

## 2) Optional manual IAM templates

If you prefer manual IAM setup, templates remain available:
- `docs/deployment/iam/github-oidc-trust-policy.json`
- `docs/deployment/iam/github-actions-deploy-policy.json`

## 3) Configure repository variables

Set repository variables in GitHub:

- `AWS_ACCOUNT_ID=905418205737`
- `AWS_REGION=eu-west-2`
- `CDK_STACK_NAME=SectorMapProdStack`
- `FREE_TIER_CF_DATA_MB_LIMIT=10240`
- `FREE_TIER_CF_REQUEST_LIMIT=1000000`
- `FREE_TIER_GUARD_BLOCK_PERCENT=85`

## 4) Create GitHub Environment gate

Create environment `production` and require reviewer approval.

The deploy workflow pauses at this gate before deployment.

## 5) Final trust update

If you initially deployed with a placeholder owner, redeploy the bootstrap stack with the real owner:

```bash
export GITHUB_REPO_OWNER=<REAL_OWNER>
yarn cdk:deploy:oidc-bootstrap
```

Without this step, OIDC role assumption will fail.
