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

import { Stack } from 'aws-cdk-lib';
import { CfnDataSource, CfnGraphQLSchema, CfnResolver } from 'aws-cdk-lib/aws-appsync';
import { PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { StateMachine, StateMachineType } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';

export interface AppSyncDataSourceStepFunctionsExpressProps {
  readonly apiId: string;
}

export interface CreateStateMachineResolverProps {
  readonly stateMachine: StateMachine;
  readonly schema: CfnGraphQLSchema;
  readonly typeName: string;
  readonly fieldName: string;
}

export class AppSyncDataSourceStepFunctionsExpress extends Construct {
  readonly role: Role;
  readonly dataSource: CfnDataSource;

  constructor(scope: Construct, id: string, props: AppSyncDataSourceStepFunctionsExpressProps) {
    super(scope, id);
    this.role = new Role(this, 'ServiceRole', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
    });
    this.role.addToPolicy(new PolicyStatement({
      resources: ['*'],
      actions: ['states:StartSyncExecution'],
    }));
    const region = Stack.of(this).region;
    this.dataSource = new CfnDataSource(this, 'SyncStatesApi', {
      apiId: props.apiId,
      name: 'SyncStatesApi',
      type: 'HTTP',
      httpConfig: {
        endpoint: `https://sync-states.${region}.amazonaws.com`,
        authorizationConfig: {
          authorizationType: 'AWS_IAM',
          awsIamConfig: {
            signingRegion: region,
            signingServiceName: 'states',
          },
        },
      },
      serviceRoleArn: this.role.roleArn,
    });
  }

  createStateMachineResolver(id: string, props: CreateStateMachineResolverProps) {
    const { stateMachine, schema, typeName, fieldName } = props;
    if (stateMachine.stateMachineType !== StateMachineType.EXPRESS) {
      throw new Error(`stateMachine must be EXPRESS type. (${stateMachine.stateMachineName} is ${stateMachine.stateMachineType})`);
    }
    const resolver = new CfnResolver(this, id, {
      apiId: this.dataSource.apiId,
      typeName,
      fieldName,
      dataSourceName: this.dataSource.name,
      kind: 'UNIT',
      requestMappingTemplate: `
        {
          "version": "2018-05-29",
          "method": "POST",
          "resourcePath": "/",
          "params": {
            "headers": {
              "X-Amz-Target": "AWSStepFunctions.StartSyncExecution",
              "Content-Type": "application/x-amz-json-1.0"
            },
            "body": $util.toJson({
              "stateMachineArn": "${stateMachine.stateMachineArn}",
              "input": $util.toJson($ctx.args)
            })
          }
        }
      `,
      responseMappingTemplate: `
        $util.parseJson($ctx.result.body).output
      `,
    });
    resolver.addDependsOn(schema);
    return resolver;
  }
}