const { awscdk } = require('projen');
const { GithubCredentials } = require('projen/lib/github');
const { NpmAccess } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'OpsBR Software Technology Inc.',
  authorAddress: 'info@opsbr.com',
  authorOrganization: true,
  cdkVersion: '2.52.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-appsync-data-source-sfn-express',
  repositoryUrl: 'https://github.com/opsbr/cdk-appsync-data-source-sfn-express.git',
  packageName: '@opsbr/cdk-appsync-data-source-sfn-express',
  license: 'Apache-2.0',
  stability: 'experimental',
  scripts: {
    integ: 'npx cdk deploy --app ./lib/integ.default.js',
  },
  minNodeVersion: '18.12.1',
  packageManager: 'yarn',
  npmAccess: NpmAccess.PUBLIC,
  keywords: [
    'appsync',
    'stepfunctions',
    'Serverless',
    'State Machine',
  ],
  githubOptions: {
    projenCredentials: GithubCredentials.fromApp(),
  },
  workflowGitIdentity: {
    name: 'opsbr-bot',
    email: 'opsbr-bot@users.noreply.github.com',
  },
});
project.addGitIgnore('/cdk.out/');
project.synth();