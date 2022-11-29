const { awscdk } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Ryosuke Iwanaga',
  authorAddress: 'riywo@opsbr.com',
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
  npmAccess: NpmAccess.PUBLIC,
});
project.addGitIgnore('/cdk.out/');
project.synth();