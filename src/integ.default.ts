import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { CfnApiKey, CfnGraphQLApi, CfnGraphQLSchema } from 'aws-cdk-lib/aws-appsync';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Choice, Condition, LogLevel, Pass, StateMachine, StateMachineType } from 'aws-cdk-lib/aws-stepfunctions';
import { AppSyncDataSourceStepFunctionsExpress } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'IntegAppSyncDataSourceStepFunctionsExpress');

const initializeTask = new Pass(stack, 'Initialize', {
  parameters: {
    'values.$': '$.values',
    'length.$': 'States.ArrayLength($.values)',
    'index': 0,
    'result': 0,
  },
});
const checkIndexTask = new Choice(stack, 'Check index');
const isIndexEqualsToLength = Condition.numberEqualsJsonPath('$.index', '$.length');
const addResultAndIncrementIndexTask = new Pass(stack, 'Add result and increment index', {
  parameters: {
    'values.$': '$.values',
    'length.$': '$.length',
    'index.$': 'States.MathAdd($.index, 1)',
    'result.$': 'States.MathAdd($.result, States.ArrayGetItem($.values, $.index))',
  },
});
const returnTask = new Pass(stack, 'Return', {
  outputPath: '$.result',
});
const definition = initializeTask
  .next(checkIndexTask
    .when(isIndexEqualsToLength, returnTask)
    .otherwise(addResultAndIncrementIndexTask.next(checkIndexTask)),
  );

const sumStateMachineLogGroup = new LogGroup(stack, 'SumStateMachineLogGroup', {
  retention: RetentionDays.ONE_DAY,
  removalPolicy: RemovalPolicy.DESTROY,
});
const sumStateMachine = new StateMachine(stack, 'SumStateMachine', {
  definition,
  stateMachineType: StateMachineType.EXPRESS,
  logs: {
    destination: sumStateMachineLogGroup,
    level: LogLevel.ALL,
    includeExecutionData: true,
  },
});

const api = new CfnGraphQLApi(stack, 'Api', {
  name: 'IntegAppSyncDataSourceStepFunctionsExpress',
  authenticationType: 'API_KEY',
});
new CfnApiKey(stack, 'ApiKey', {
  apiId: api.attrApiId,
});

const schema = new CfnGraphQLSchema(stack, 'Schema', {
  apiId: api.attrApiId,
  definition: `
    schema {
      query: Query
      mutation: Mutation
    }
    type Query {
      sum(values: [Int!]!): Int!
    }
    type Mutation {
      sum(values: [Int!]!): Int!
    }
  `,
});

const sfnExpressDataSource = new AppSyncDataSourceStepFunctionsExpress(stack, 'SfnExpressDataSource', {
  apiId: api.attrApiId,
});
sfnExpressDataSource.addStateMachineResolver('SumResolver', {
  stateMachine: sumStateMachine,
  schema,
  typeName: 'Query',
  fieldName: 'sum',
});