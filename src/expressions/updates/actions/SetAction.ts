import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';
import { UpdateAction } from './UpdateAction.js';
import { type DocumentPath } from '../../operands/DocumentPath.js';
import { type Operand } from '../../operands/Operand.js';
import { mergeExpressionAttributeNames } from '../../expression-attribute-names.js';
import { mergeExpressionAttributeValues } from '../../expression-attribute-values.js';

export class SetAction extends UpdateAction {
  private constructor(
    statement: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(statement, expressionAttributeNames, expressionAttributeValues);
  }

  public static setValue(
    documentPath: DocumentPath,
    value: Operand,
  ): SetAction {
    const statement = `${documentPath.symbolicValue} = ${value.symbolicValue}`;

    return new SetAction(
      statement,
      mergeExpressionAttributeNames([documentPath, value]),
      mergeExpressionAttributeValues([documentPath, value]),
    );
  }
}
