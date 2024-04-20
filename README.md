# DynamoDB CRUD Builder

This library helps you to create DynamoDB operations without dealing with
expressions, expression attribute values or expression attribute names.
It does not perform any data type validations or mapping, but it could
be used as a base to build more complex tools like an ORM.

## Usage

### Document paths

To build an expression (filter, condition, update, etc), we start with
`DocumentPath` and `Operand` objects. A `DocumentPath` represents an
attribute of a record, and an `Operand` is a `DocumentPath` or an expression
we can use to build more complex expressions.

```typescript
import {
  DocumentPath,
  Operand,
  ConditionExpression,
} from 'dynamodb-crud-builder/expressions';

const attr: DocumentPath = new DocumentPath('attr');
// #attr

const attr2: DocumentPath = new DocumentPath('attr2.b[0].c');
// #attr2.#b[0].#c

const attrSize: Operand = attr.size();
// size(#attr)

const attrSizeIsBig: ConditionExpression = attrSize.greaterThan(20);
// size(#attr) > :literal9sXoCNfWk2

const attrIsSmallerThanAttr2: ConditionExpression = attrSize.lessThan(
  attr2.size(),
);
// size(#attr) > size(#attr2.#b[0].#c)
```

We can use literal values in expressions,
which are internally included in expression attribute values
with a placeholder that matches pattern `:literal\w{10}`.

### Condition expressions

We can build some condition expressions with a `DocumentPath`.

```typescript
import {
  DocumentPath,
  Operand,
  ConditionExpression,
} from 'dynamodb-crud-builder/expressions';

const attr = new DocumentPath('attr');

// Condition expressions

const attrExists: ConditionExpression = a.exists();
// attribute_exists(#attr)

const attrDoesNotExist: ConditionExpression = a.notExists();
// attribute_not_exists(#attr)

const attrIsString: ConditionExpression = a.type('S');
// attribute_type(#attr, :literal9sXoCNfWk2)

const attrHasPrefix: ConditionExpression = a.beginsWith('prefix');
// begins_with(#attr, :literal9sXoCNfWk2)

// Functions

const attrSize: Operand = a.size();
// size(#attr)

const tenIfAttrDoesNotExists: Operand = a.ifNotExists(10);
// if_not_exists(#attr, :literal9sXoCNfWk2)
```

`Operand` interface lets us build another expressions.

```typescript
import {
  DocumentPath,
  ConditionExpression,
} from 'dynamodb-crud-builder/expressions';

const attr = new DocumentPath('attr'),
  attrSize: Operand = attr.size(); // size(#attr)

// Arithmetic expressions

const sum: Operand = attrSize.plus(20);
// size(#attr) + :literal9sXoCNfWk2

const subtraction = a.minus(20);
// size(#attr) - :literal9sXoCNfWk2

// Condition expressions
const equalTo: ConditionExpression = attrSize.equalTo(20);
// size(#attr) = :literal9sXoCNfWk2

const notEqualTo: ConditionExpression = attrSize.equalTo(20);
// size(#attr) <> :literal9sXoCNfWk2

const lessThan: ConditionExpression = attrSize.lessThan(20);
// size(#attr) < :literal9sXoCNfWk2

const lessThanOrEqualTo: ConditionExpression = attrSize.lessThanOrEqualTo(20);
// size(#attr) <= :literal9sXoCNfWk2

const greaterThan: ConditionExpression = attrSize.greaterThan(20);
// size(#attr) <= :literal9sXoCNfWk2

const greaterThanOrEqualTo: ConditionExpression =
  attrSize.greaterThanOrEqualTo(20);
// size(#attr) <= :literal9sXoCNfWk2

const between: ConditionExpression = attrSize.between(20, 30);
// size(#attr) BETWEEN :literal9sXoCNfWk2 AND :literal23gIe9LPqr

const _in: ConditionExpression = attrSize.in([20, 30]);
// size(#attr) IN (:literal9sXoCNfWk2, :literal23gIe9LPqr)

const contains: ConditionExpression = attr.contains(30);
// contains(#attr, :literal23gIe9LPqr)
```

It's possible to create more complex condition expressions
with logical operators.

```typescript
import {
  DocumentPath,
  ConditionExpression,
} from 'dynamodb-crud-builder/expressions';

const attrA = new DocumentPath('attrA'),
  attrB = new DocumentPath('attrB'),
  attrC = new DocumentPath('attrC');

const conditionA: ConditionExpression = attrA.size().equalTo(10);
// size(#attrA) = :literal9sXoCNfWk2

const conditionB: ConditionExpression = attrB.exists();
// attribute_exists(#attrB)

const conditionC: ConditionExpression = attrA.lessThan(attrB);
// #attrA < #attrB

const conjunction: ConditionExpression = conditionA.and(conditionB, conditionC);
// ((size(#attrA) = :literal9sXoCNfWk2) AND (attribute_exists(#attrB)) AND (#attrA < #attrB))

const disjunction: ConditionExpression = conditionA.or(conditionB, conditionC);
// ((size(#attrA) = :literal9sXoCNfWk2) OR (attribute_exists(#attrB)) OR (#attrA < #attrB))

const negation: ConditionExpression = conditionA.not();
// (NOT (size(#attrA) = :literal9sXoCNfWk2))
```

### Update expressions

In order to build an update expression, we need to use `DocumentPath`,
which provides methods to create update actions.

```typescript
import {
  DocumentPath,
  UpdateExpression,
} from 'dynamodb-crud-builder/expressions';

const attrA = new DocumentPath('attrA'),
  attrB = new DocumentPath('attrB'),
  attrC = new DocumentPath('attrC'),
  attrD = new DocumentPath('attrD'),
  attrE = new DocumentPath('attrE'),
  attrF = new DocumentPath('attrF'),
  attrG = new DocumentPath('attrG'),
  attrH = new DocumentPath('attrH');

const attrX = new DocumentPath('attrX');

const updateExpression = new UpdateExpression().addActions(
  attrA.set('value'),
  attrB.setIfNotExists(10),
  attrC.increment(1),
  attrD.decrement(attrX), // We can use DocumentPath or literal values
  attrE.append([10, 20, 30]),
  attrF.add(new Set(['a', 'b', 'c'])),
  attrG.delete(new Set(['d', 'e', 'f'])),
  attrH.remove(),
);
// SET #attrA = :literal9sXoCNfWk2,
//     #attrB = if_not_exists(#attrB, :literal23gIe9LPqr),
//     #attrC = #attrC + :literalU9f9sn4bqo,
//     #attrD = #attrD - #attrX,
//     #attrE = list_append(#attrE, :literal2tsVTznkZR)
// ADD #attrF :literalpxXhOSy1nd
// DELETE #attrG :literal7mmcg5278u
// REMOVE #attrH
```

This way, it's easy to add update actions conditionally.

```typescript
import {
  DocumentPath,
  UpdateExpression,
} from 'dynamodb-crud-builder/expressions';

const attrA = new DocumentPath('attrA'),
  attrB = new DocumentPath('attrB'),
  attrC = new DocumentPath('attrC');

const updateExpression = new UpdateExpression().addAction(attrA.set(30));

if (condition) {
  updateExpression.addAction(attrB.set(10));
} else {
  updateExpression.addAction(attrC.set(20));
}
```

### Projection expressions

To build projection expressions, we only need a list of document paths.

```typescript
import {
  DocumentPath,
  ProjectionExpression,
} from 'dynamodb-crud-builder/expressions';

const attrA = new DocumentPath('attrA'),
  attrB = new DocumentPath('attrB'),
  attrC = new DocumentPath('attrC');

const projectionExpression = new ProjectionExpression()
  .addAttribute(attrA)
  .addAttribute(attrB)
  .addAttribute(attrC);
// #attrA, #attrB, #attrC
```

## Write

### Put item

```typescript
import { PutItem } from 'dynamodb-crud-builder/write';
import { DocumentPath } from 'dynamodb-crud-builder/expressions';
import { PutItemCommand, TransactWriteItem } from '@aws-sdk/client-dynamodb';

const item = {
  pk: 'pk',
  sk: 'sk',
  attr0: 10,
};

const attr0 = new DocumentPath('attr0');

const putItem = new PutItem(item)
  .intoTable('table-00')
  .onlyIf(attr0.notExists());

const putItemCommand: PutItemCommand = putItem.asCommand();
const transactWriteItem: TransactWriteItem = putItem.asTransactWriteItem();

await putItem.commit(dynamodbClient);
```

### Delete item

```typescript
import { DeleteItem } from 'dynamodb-crud-builder/write';
import { DeleteItemCommand, TransactWriteItem } from '@aws-sdk/client-dynamodb';

const key = {
  pk: 'pk',
  sk: 'sk',
};

const attr0 = new DocumentPath('attr0');

const deleteItem = new DeleteItem(key)
  .fromTable('table-00')
  .onlyIf(attr0.notExists());

const deleteItemCommand: DeleteItemCommand = deleteItem.asCommand();
const transactWriteItem: TransactWriteItem = deleteItem.asTransactWriteItem();

await deleteItem.commit(dynamodbClient);
```

### Update item

```typescript
import { UpdateItem } from 'dynamodb-crud-builder/write';
import {
  DocumentPath,
  UpdateExpression,
} from 'dynamodb-crud-builder/expressions';
import { UpdateItemCommand, TransactWriteItem } from '@aws-sdk/client-dynamodb';

const key = {
  pk: 'pk',
  sk: 'sk',
};

const attr0 = new DocumentPath('attr0');

const updateExpression = new UpdateExpression().addActions(
  attr0.set('value'),
  attr1.increment(10),
);

const updateItem = new UpdateItem(key)
  .inTable('table-00')
  .applying(updateExpression)
  .onlyIf(attr0.notExists());

const updateItemCommand: UpdateItemCommand = updateItem.asCommand();
const transactWriteItem: TransactWriteItem = updateItem.asTransactWriteItem();

await updateItem.commit(dynamodbClient);
```
