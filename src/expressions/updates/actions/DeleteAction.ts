import clone from 'just-clone';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';
import { UpdateAction } from './UpdateAction.js';
import { type DocumentPath } from '../../operands/DocumentPath.js';
import { type Operand } from '../../operands/Operand.js';

export class DeleteAction extends UpdateAction {
  private constructor(
    statement: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(statement, expressionAttributeNames, expressionAttributeValues);
  }

  public static deleteElementsFromSet(
    documentPath: DocumentPath,
    subset: Operand,
  ): DeleteAction {
    const statement = `${documentPath.symbolicValue} ${subset.symbolicValue}`;

    return new DeleteAction(
      statement,
      clone(documentPath.expressionAttributeNames),
      clone(subset.expressionAttributeValues),
    );
  }
}
