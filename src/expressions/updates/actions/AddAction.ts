import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';
import { UpdateAction } from './UpdateAction.js';
import { type DocumentPath } from '../../operands/DocumentPath.js';
import { type Operand } from '../../operands/Operand.js';
import { mergeExpressionAttributeNames } from '../../expression-attribute-names.js';
import { mergeExpressionAttributeValues } from '../../expression-attribute-values.js';

export class AddAction extends UpdateAction {
  public constructor(
    statement: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(statement, expressionAttributeNames, expressionAttributeValues);
  }

  public static addValueToAttribute(
    documentPath: DocumentPath,
    value: Operand,
  ): AddAction {
    const statement = `${documentPath.symbolicValue} ${value.symbolicValue}`;

    return new AddAction(
      statement,
      mergeExpressionAttributeNames([documentPath, value]),
      mergeExpressionAttributeValues([documentPath, value]),
    );
  }
}
