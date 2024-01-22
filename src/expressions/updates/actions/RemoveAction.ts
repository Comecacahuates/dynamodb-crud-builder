import clone from 'just-clone';
import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';
import { UpdateAction } from './UpdateAction.js';
import { type DocumentPath } from '../../operands/DocumentPath.js';

export class RemoveAction extends UpdateAction {
  private constructor(
    statement: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(statement, expressionAttributeNames, expressionAttributeValues);
  }

  public static removeAttribute(documentPath: DocumentPath): RemoveAction {
    const statement = `${documentPath.symbolicValue}`;

    return new RemoveAction(
      statement,
      clone(documentPath.expressionAttributeNames),
      clone(documentPath.expressionAttributeValues),
    );
  }
}
