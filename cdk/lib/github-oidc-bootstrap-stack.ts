import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Effect, OpenIdConnectProvider, OpenIdConnectPrincipal, PolicyDocument, PolicyStatement, Role } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

type GitHubOidcBootstrapStackProps = StackProps & {
  repoName: string;
  repoOwner: string;
  roleName: string;
  createOidcProvider: boolean;
};

export class GitHubOidcBootstrapStack extends Stack {
  constructor(scope: Construct, id: string, props: GitHubOidcBootstrapStackProps) {
    super(scope, id, props);

    const providerUrl = "https://token.actions.githubusercontent.com";
    const providerHost = "token.actions.githubusercontent.com";
    const subPattern = `repo:${props.repoOwner}/${props.repoName}:ref:refs/heads/main`;

    const provider = props.createOidcProvider
      ? new OpenIdConnectProvider(this, "GitHubOidcProvider", {
          url: providerUrl,
          clientIds: ["sts.amazonaws.com"],
        })
      : OpenIdConnectProvider.fromOpenIdConnectProviderArn(
          this,
          "GitHubOidcProviderImport",
          `arn:aws:iam::${this.account}:oidc-provider/${providerHost}`,
        );

    const deployRole = new Role(this, "GitHubActionsCdkDeployRole", {
      roleName: props.roleName,
      assumedBy: new OpenIdConnectPrincipal(provider).withConditions({
        StringEquals: {
          [`${providerHost}:aud`]: "sts.amazonaws.com",
        },
        StringLike: {
          [`${providerHost}:sub`]: subPattern,
        },
      }),
      inlinePolicies: {
        GitHubActionsDeployPolicy: new PolicyDocument({
          statements: [
            new PolicyStatement({
              sid: "CloudFormationAndCdk",
              effect: Effect.ALLOW,
              actions: [
                "cloudformation:*",
                "ssm:GetParameter",
                "ecr:GetAuthorizationToken",
                "ecr:BatchGetImage",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchCheckLayerAvailability",
              ],
              resources: ["*"],
            }),
            new PolicyStatement({
              sid: "IamPassRoleForCdkBootstrap",
              effect: Effect.ALLOW,
              actions: ["iam:PassRole"],
              resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
            }),
            new PolicyStatement({
              sid: "ReadWriteWebsiteBucket",
              effect: Effect.ALLOW,
              actions: [
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:PutObjectAcl",
              ],
              resources: ["arn:aws:s3:::*", "arn:aws:s3:::*/*"],
            }),
            new PolicyStatement({
              sid: "CloudFrontInvalidationAndRead",
              effect: Effect.ALLOW,
              actions: [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetDistribution",
                "cloudfront:GetDistributionConfig",
                "cloudfront:ListDistributions",
              ],
              resources: ["*"],
            }),
            new PolicyStatement({
              sid: "CloudWatchReadForGuardrails",
              effect: Effect.ALLOW,
              actions: ["cloudwatch:GetMetricStatistics"],
              resources: ["*"],
            }),
          ],
        }),
      },
    });

    new CfnOutput(this, "GitHubActionsDeployRoleArn", {
      value: deployRole.roleArn,
      description: "Role ARN for GitHub Actions OIDC deployments.",
    });

    new CfnOutput(this, "GitHubActionsDeployRoleName", {
      value: deployRole.roleName,
      description: "Role name for GitHub Actions OIDC deployments.",
    });

    new CfnOutput(this, "GitHubOidcSubPattern", {
      value: subPattern,
      description: "OIDC sub claim pattern trusted by this role.",
    });

    new CfnOutput(this, "GitHubOidcProviderArn", {
      value: provider.openIdConnectProviderArn,
      description: "OIDC provider ARN used by the deployment role.",
    });
  }
}
