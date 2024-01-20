import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';
import { UpdateAction } from './UpdateAction.js';
import { DocumentPath } from '../../operands/DocumentPath.js';
import { Operand } from '../../operands/Operand.js';
import { mergeExpressionAttributeNames } from '../../expression-attribute-names.js';
import { mergeExpressionAttributeValues } from '../../expression-attribute-values.js';

export class SetAction extends UpdateAction {
  public constructor(
    statement: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(statement, expressionAttributeNames, expressionAttributeValues);
  }

  public static assign(
    documentPath: DocumentPath,
    operand: Operand,
  ): SetAction {
    const statement = `${documentPath.symbolicValue} = ${operand.symbolicValue}`;

    return new SetAction(
      statement,
      mergeExpressionAttributeNames([documentPath, operand]),
      mergeExpressionAttributeValues([documentPath, operand]),
    );
  }

  public static assignSum(
    documentPath: DocumentPath,
    operandA: Operand,
    operandB: Operand,
  ): SetAction {
    const statement = `${documentPath.symbolicValue} = ${operandA.symbolicValue} + ${operandB.symbolicValue}`;

    return new SetAction(
      statement,
      mergeExpressionAttributeNames([documentPath, operandA, operandB]),
      mergeExpressionAttributeValues([documentPath, operandA, operandB]),
    );
  }
}
