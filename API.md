# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AppSyncDataSourceStepFunctionsExpress <a name="AppSyncDataSourceStepFunctionsExpress" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress"></a>

#### Initializers <a name="Initializers" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.Initializer"></a>

```typescript
import { AppSyncDataSourceStepFunctionsExpress } from '@opsbr/cdk-appsync-data-source-sfn-express'

new AppSyncDataSourceStepFunctionsExpress(scope: Construct, id: string, props: AppSyncDataSourceStepFunctionsExpressProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.Initializer.parameter.props">props</a></code> | <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpressProps">AppSyncDataSourceStepFunctionsExpressProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.Initializer.parameter.props"></a>

- *Type:* <a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpressProps">AppSyncDataSourceStepFunctionsExpressProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.createStateMachineResolver">createStateMachineResolver</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `createStateMachineResolver` <a name="createStateMachineResolver" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.createStateMachineResolver"></a>

```typescript
public createStateMachineResolver(id: string, props: CreateStateMachineResolverProps): CfnResolver
```

###### `id`<sup>Required</sup> <a name="id" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.createStateMachineResolver.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.createStateMachineResolver.parameter.props"></a>

- *Type:* <a href="#@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps">CreateStateMachineResolverProps</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.isConstruct"></a>

```typescript
import { AppSyncDataSourceStepFunctionsExpress } from '@opsbr/cdk-appsync-data-source-sfn-express'

AppSyncDataSourceStepFunctionsExpress.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.property.dataSource">dataSource</a></code> | <code>aws-cdk-lib.aws_appsync.CfnDataSource</code> | *No description.* |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `dataSource`<sup>Required</sup> <a name="dataSource" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.property.dataSource"></a>

```typescript
public readonly dataSource: CfnDataSource;
```

- *Type:* aws-cdk-lib.aws_appsync.CfnDataSource

---

##### `role`<sup>Required</sup> <a name="role" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpress.property.role"></a>

```typescript
public readonly role: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

---


## Structs <a name="Structs" id="Structs"></a>

### AppSyncDataSourceStepFunctionsExpressProps <a name="AppSyncDataSourceStepFunctionsExpressProps" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpressProps"></a>

#### Initializer <a name="Initializer" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpressProps.Initializer"></a>

```typescript
import { AppSyncDataSourceStepFunctionsExpressProps } from '@opsbr/cdk-appsync-data-source-sfn-express'

const appSyncDataSourceStepFunctionsExpressProps: AppSyncDataSourceStepFunctionsExpressProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpressProps.property.apiId">apiId</a></code> | <code>string</code> | *No description.* |

---

##### `apiId`<sup>Required</sup> <a name="apiId" id="@opsbr/cdk-appsync-data-source-sfn-express.AppSyncDataSourceStepFunctionsExpressProps.property.apiId"></a>

```typescript
public readonly apiId: string;
```

- *Type:* string

---

### CreateStateMachineResolverProps <a name="CreateStateMachineResolverProps" id="@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps"></a>

#### Initializer <a name="Initializer" id="@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.Initializer"></a>

```typescript
import { CreateStateMachineResolverProps } from '@opsbr/cdk-appsync-data-source-sfn-express'

const createStateMachineResolverProps: CreateStateMachineResolverProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.property.fieldName">fieldName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.property.schema">schema</a></code> | <code>aws-cdk-lib.aws_appsync.CfnGraphQLSchema</code> | *No description.* |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.property.stateMachine">stateMachine</a></code> | <code>aws-cdk-lib.aws_stepfunctions.StateMachine</code> | *No description.* |
| <code><a href="#@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.property.typeName">typeName</a></code> | <code>string</code> | *No description.* |

---

##### `fieldName`<sup>Required</sup> <a name="fieldName" id="@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.property.fieldName"></a>

```typescript
public readonly fieldName: string;
```

- *Type:* string

---

##### `schema`<sup>Required</sup> <a name="schema" id="@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.property.schema"></a>

```typescript
public readonly schema: CfnGraphQLSchema;
```

- *Type:* aws-cdk-lib.aws_appsync.CfnGraphQLSchema

---

##### `stateMachine`<sup>Required</sup> <a name="stateMachine" id="@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.property.stateMachine"></a>

```typescript
public readonly stateMachine: StateMachine;
```

- *Type:* aws-cdk-lib.aws_stepfunctions.StateMachine

---

##### `typeName`<sup>Required</sup> <a name="typeName" id="@opsbr/cdk-appsync-data-source-sfn-express.CreateStateMachineResolverProps.property.typeName"></a>

```typescript
public readonly typeName: string;
```

- *Type:* string

---



