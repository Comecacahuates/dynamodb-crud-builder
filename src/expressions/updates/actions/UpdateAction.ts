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

  public static setValue(
    documentPath: DocumentPath,
    value: Operand,
  ): UpdateAction {
    const statement = `${documentPath.symbolicValue} = ${value.symbolicValue}`;

    return new UpdateAction(
      UpdateActionType.SET,
      statement,
      mergeExpressionAttributeNames([documentPath, value]),
      mergeExpressionAttributeValues([documentPath, value]),
    );
  }
}
