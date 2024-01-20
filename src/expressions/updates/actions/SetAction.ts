import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';
import { UpdateAction } from './UpdateAction.js';

export class SetAction extends UpdateAction {
  public constructor(
    statement: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(statement, expressionAttributeNames, expressionAttributeValues);
  }
}
