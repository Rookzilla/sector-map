#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { GitHubOidcBootstrapStack } from "../lib/github-oidc-bootstrap-stack";
import { SectorMapStack } from "../lib/sector-map-stack";

const app = new cdk.App();

const account = process.env.AWS_ACCOUNT_ID ?? process.env.CDK_DEFAULT_ACCOUNT ?? "905418205737";
const region = process.env.AWS_REGION ?? process.env.CDK_DEFAULT_REGION ?? "eu-west-2";
const stackName = process.env.CDK_STACK_NAME ?? "SectorMapProdStack";
const oidcBootstrapStackName = process.env.OIDC_BOOTSTRAP_STACK_NAME ?? "SectorMapGitHubOidcBootstrapStack";
const repoName = process.env.GITHUB_REPO_NAME ?? "sector-map";
const repoOwner = process.env.GITHUB_REPO_OWNER ?? "<OWNER>";
const deployRoleName = process.env.GITHUB_ACTIONS_DEPLOY_ROLE_NAME ?? "GitHubActionsCdkDeployRole";
const createOidcProvider = (process.env.CREATE_GITHUB_OIDC_PROVIDER ?? "true").toLowerCase() !== "false";

new SectorMapStack(app, stackName, {
  env: { account, region },
  stackName,
  description: "Sector Map static frontend stack (S3 + CloudFront).",
});

new GitHubOidcBootstrapStack(app, oidcBootstrapStackName, {
  env: { account, region },
  stackName: oidcBootstrapStackName,
  description: "GitHub OIDC provider + deploy role bootstrap stack for Sector Map CI/CD.",
  repoName,
  repoOwner,
  roleName: deployRoleName,
  createOidcProvider,
});
