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
  public constructor(
    statement: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(statement, expressionAttributeNames, expressionAttributeValues);
  }

  public static assignValueToAttribute(
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

  public static assignSumToAttribute(
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

  public static assignDifferenceToAttribute(
    documentPath: DocumentPath,
    operandA: Operand,
    operandB: Operand,
  ): SetAction {
    const statement = `${documentPath.symbolicValue} = ${operandA.symbolicValue} - ${operandB.symbolicValue}`;

    return new SetAction(
      statement,
      mergeExpressionAttributeNames([documentPath, operandA, operandB]),
      mergeExpressionAttributeValues([documentPath, operandA, operandB]),
    );
  }
}
