/*
    Copyright 2022 OpsBR Software Technology Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { CfnGraphQLSchema } from 'aws-cdk-lib/aws-appsync';
import { Pass, StateMachine, StateMachineType } from 'aws-cdk-lib/aws-stepfunctions';
import { AppSyncDataSourceStepFunctionsExpress } from '../src';

const mockApp = new App();
const stack = new Stack(mockApp);
const apiId = 'apiId';
const dataSource = new AppSyncDataSourceStepFunctionsExpress(stack, 'testingStack', { apiId });
const stateMachine = new StateMachine(stack, 'myStateMachine', {
  stateMachineType: StateMachineType.EXPRESS,
  definition: new Pass(stack, 'Pass'),
});
dataSource.createStateMachineResolver('resolver', {
  stateMachine,
  schema: new CfnGraphQLSchema(stack, 'Schema', { apiId }),
  typeName: 'Query',
  fieldName: 'getPost',
});
const template = Template.fromStack(stack);

test('Service role should be created', () => {
  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'appsync.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
  });
  template.hasResourceProperties('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: 'states:StartSyncExecution',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
    Roles: [
      {
        Ref: Match.stringLikeRegexp('testingStackServiceRole'),
      },
    ],
  });
});

test('DataSource should be created', () => {
  template.hasResourceProperties('AWS::AppSync::DataSource', {
    ApiId: apiId,
    Type: 'HTTP',
    HttpConfig: {
      AuthorizationConfig: {
        AuthorizationType: 'AWS_IAM',
        AwsIamConfig: {
          SigningServiceName: 'states',
        },
      },
    },
    ServiceRoleArn: {
      'Fn::GetAtt': Match.arrayWith([
        Match.stringLikeRegexp('testingStackServiceRole'),
      ]),
    },
  });
});

test('Resolver should be added', () => {
  template.hasResourceProperties('AWS::AppSync::Resolver', {
    ApiId: apiId,
    TypeName: 'Query',
    FieldName: 'getPost',
    Kind: 'UNIT',
    RequestMappingTemplate: {
      'Fn::Join': [
        '',
        Match.arrayWith([{
          Ref: Match.stringLikeRegexp('myStateMachine'),
        }]),
      ],
    },
  });
});