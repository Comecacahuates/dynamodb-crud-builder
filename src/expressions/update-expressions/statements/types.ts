import {
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../../types.js';

export type UpdateStatement = {
  statementString: string;
  expressionAttributeNames: ExpressionAttributeNames;
  expressionAttributeValues: ExpressionAttributeValues;
};
