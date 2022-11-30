[![npm version](https://badge.fury.io/js/@opsbr%2Fcdk-appsync-data-source-sfn-express.svg)](https://badge.fury.io/js/@opsbr%2Fcdk-appsync-data-source-sfn-express) [![release](https://github.com/opsbr/cdk-appsync-data-source-sfn-express/actions/workflows/release.yml/badge.svg)](https://github.com/opsbr/cdk-appsync-data-source-sfn-express/actions/workflows/release.yml)

# cdk-appsync-data-source-sfn-express

A CDK construct to create an AWS AppSync data source to call AWS Step Functions express workflows.

[![View on Construct Hub](https://constructs.dev/badge?package=%40opsbr%2Fcdk-appsync-data-source-sfn-express)](https://constructs.dev/packages/@opsbr/cdk-appsync-data-source-sfn-express)
## What is this?

This construct provides an HTTP data source for AWS AppSync that uses IAM authentication and
calls AWS Step Functions API - `StartSyncExecution`. This is a stop-gap solution until AWS
provides a native integration with this API like they have for AWS Lambda or Amazon DynamoDB.

Then, the construct can easily create a resolver to call this API, which means you can build
AppSync GraphQL API by running a Step Functions state machine synchronously just like Amazon
API Gateway already has, too.

Also, this is a showcase for how to use HTTP data source for non-RESTful AWS endpoints.

## Usage

```typescript
declare const api: appsync.CfnGraphQLApi;
declare const stateMachine: stepfunctions.StateMachine;

const schema = new appsync.CfnGraphQLSchema(stack, 'Schema', {
  apiId: api.attrApiId,
  definition: `
    type Query {
      getPost(id: Int): Post
    }
    type Post {
      id: Int
      title: String
    }
  `,
});

const sfnExpressDataSource = new AppSyncDataSourceStepFunctionsExpress(stack, 'SfnExpressDataSource', {
  apiId: api.attrApiId,
});

sfnExpressDataSource.createStateMachineResolver('SumResolver', {
  stateMachine: sumStateMachine,
  schema,
  typeName: 'Query',
  fieldName: 'getPost',
});
```

When queried, the specified state machine receives input as the arguments of `getPost()` e.g.:

```graphql
query MyQuery {
  getPost(id: 1)
}
```

is transformed to:

```json
{
  "id": 1
}
```

And the state machine should return the output like below:

```json
{
  "id": 1,
  "title": "Hello world!"
}
```

Then, AppSync returns the output as the return type of the query:

```graphql
{
  "data": {
    "getPost": {
      "id": 1,
      "title": "Hello world!"
    }
  }
}
```

## Notes

- The state machine must be EXPRESS type. See [Step Functions document](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-standard-vs-express.html) for more details.
- Currently, this construct doesn't have a good error handling on the response mapping.
  - We need to handle the case when the workflow fails because `StartSyncExecution` returns 200. See [Step Functions document](https://docs.aws.amazon.com/step-functions/latest/apireference/API_StartSyncExecution.html).

## Authors

OpsBR Software Technology Inc. Visit our website: [https://opsbr.com](https://opsbr.com)

## License

Apache 2.0
