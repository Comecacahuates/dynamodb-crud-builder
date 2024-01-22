import clone from 'just-clone';
import { type DocumentPath } from '../../operands/DocumentPath.js';
import { type Operand } from '../../operands/Operand.js';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';
import { mergeExpressionAttributeNames } from '../../expression-attribute-names.js';
import { mergeExpressionAttributeValues } from '../../expression-attribute-values.js';

export enum UpdateActionType {
  SET,
  REMOVE,
  ADD,
  DELETE,
}

export class UpdateAction {
  public constructor(
    public readonly type: UpdateActionType,
    public readonly statement: string,
    public readonly expressionAttributeNames: ExpressionAttributeNames,
    public readonly expressionAttributeValues: ExpressionAttributeValues,
  ) {
    this.expressionAttributeNames = clone(expressionAttributeNames);
    this.expressionAttributeValues = clone(expressionAttributeValues);
  }

  public static set(documentPath: DocumentPath, value: Operand): UpdateAction {
    const statement = `${documentPath.symbolicValue} = ${value.symbolicValue}`;

    return new UpdateAction(
      UpdateActionType.SET,
      statement,
      mergeExpressionAttributeNames([documentPath, value]),
      mergeExpressionAttributeValues([documentPath, value]),
    );
  }

  public static increment(
    documentPath: DocumentPath,
    value: Operand,
  ): UpdateAction {
    const statement = `${documentPath.symbolicValue} = ${documentPath.symbolicValue} + ${value.symbolicValue}`;

    return new UpdateAction(
      UpdateActionType.SET,
      statement,
      mergeExpressionAttributeNames([documentPath, value]),
      mergeExpressionAttributeValues([documentPath, value]),
    );
  }

  public static decrement(
    documentPath: DocumentPath,
    value: Operand,
  ): UpdateAction {
    const statement = `${documentPath.symbolicValue} = ${documentPath.symbolicValue} - ${value.symbolicValue}`;

    return new UpdateAction(
      UpdateActionType.SET,
      statement,
      mergeExpressionAttributeNames([documentPath, value]),
      mergeExpressionAttributeValues([documentPath, value]),
    );
  }

  public static appendItems(
    documentPath: DocumentPath,
    items: Operand,
  ): UpdateAction {
    const statement = `${documentPath.symbolicValue} = list_append(${documentPath.symbolicValue}, ${items.symbolicValue})`;

    return new UpdateAction(
      UpdateActionType.SET,
      statement,
      mergeExpressionAttributeNames([documentPath, items]),
      mergeExpressionAttributeValues([documentPath, items]),
    );
  }

  public static add(documentPath: DocumentPath, value: Operand): UpdateAction {
    const statement = `${documentPath.symbolicValue} ${value.symbolicValue}`;

    return new UpdateAction(
      UpdateActionType.ADD,
      statement,
      mergeExpressionAttributeNames([documentPath, value]),
      mergeExpressionAttributeValues([documentPath, value]),
    );
  }

  public static remove(documentPath: DocumentPath): UpdateAction {
    const statement = `${documentPath.symbolicValue}`;

    return new UpdateAction(
      UpdateActionType.REMOVE,
      statement,
      documentPath.expressionAttributeNames,
      documentPath.expressionAttributeValues,
    );
  }
}
