import copy from '@stdlib/utils-copy';
import { type DocumentPath, type Operand } from '../operands/index.js';
import {
  Expression,
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../Expression.js';

export enum UpdateActionType {
  SET,
  REMOVE,
  ADD,
  DELETE,
}

export class UpdateAction extends Expression {
  private constructor(
    private readonly type: UpdateActionType,
    expressionString: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(
      expressionString,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  public getType(): UpdateActionType {
    return this.type;
  }

  public static setValue(
    documentPath: DocumentPath,
    value: Operand,
  ): UpdateAction {
    const expressionString = `${documentPath.getExpressionString()} = ${value.getExpressionString()}`;

    return new UpdateAction(
      UpdateActionType.SET,
      expressionString,
      documentPath.mergeAttributeNames(value),
      documentPath.mergeAttributeValues(value),
    );
  }

  public static setValueIfNotExists(
    documentPath: DocumentPath,
    value: Operand,
  ): UpdateAction {
    const expressionString = `${documentPath.getExpressionString()} = if_not_exists(${documentPath.getExpressionString()}, ${value.getExpressionString()})`;

    return new UpdateAction(
      UpdateActionType.SET,
      expressionString,
      documentPath.mergeAttributeNames(value),
      documentPath.mergeAttributeValues(value),
    );
  }

  public static increment(
    documentPath: DocumentPath,
    value: Operand,
  ): UpdateAction {
    const expressionString = `${documentPath.getExpressionString()} = ${documentPath.getExpressionString()} + ${value.getExpressionString()}`;

    return new UpdateAction(
      UpdateActionType.SET,
      expressionString,
      documentPath.mergeAttributeNames(value),
      documentPath.mergeAttributeValues(value),
    );
  }

  public static createDecrement(
    documentPath: DocumentPath,
    value: Operand,
  ): UpdateAction {
    const expressionString = `${documentPath.getExpressionString()} = ${documentPath.getExpressionString()} - ${value.getExpressionString()}`;

    return new UpdateAction(
      UpdateActionType.SET,
      expressionString,
      documentPath.mergeAttributeNames(value),
      documentPath.mergeAttributeValues(value),
    );
  }

  public static createAppendItems(
    documentPath: DocumentPath,
    items: Operand,
  ): UpdateAction {
    const expressionString = `${documentPath.getExpressionString()} = list_append(${documentPath.getExpressionString()}, ${items.getExpressionString()})`;

    return new UpdateAction(
      UpdateActionType.SET,
      expressionString,
      documentPath.mergeAttributeNames(items),
      documentPath.mergeAttributeValues(items),
    );
  }

  public static createAdd(
    documentPath: DocumentPath,
    value: Operand,
  ): UpdateAction {
    const expressionString = `${documentPath.getExpressionString()} ${value.getExpressionString()}`;

    return new UpdateAction(
      UpdateActionType.ADD,
      expressionString,
      documentPath.mergeAttributeNames(value),
      documentPath.mergeAttributeValues(value),
    );
  }

  public static createRemove(documentPath: DocumentPath): UpdateAction {
    const expressionString = `${documentPath.getExpressionString()}`;

    return new UpdateAction(
      UpdateActionType.REMOVE,
      expressionString,
      copy(documentPath.getAttributeNames()),
      copy(documentPath.getAttributeValues()),
    );
  }

  public static createDelete(
    documentPath: DocumentPath,
    elements: Operand,
  ): UpdateAction {
    const expressionString = `${documentPath.getExpressionString()} ${elements.getExpressionString()}`;

    return new UpdateAction(
      UpdateActionType.DELETE,
      expressionString,
      documentPath.mergeAttributeNames(elements),
      documentPath.mergeAttributeValues(elements),
    );
  }
}
