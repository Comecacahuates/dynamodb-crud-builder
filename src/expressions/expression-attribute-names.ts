import { type ExpressionAttributeNames } from './types.js';
import {
  type DocumentPath as OldDocumentPath,
  formatDocumentPathItem,
} from '../document-path/index.js';
import { type Operand } from './operands/Operand.js';
import { type Condition } from './conditions/Condition.js';

export function mergeExpressionAttributeNames(
  operandsAndConditions: Array<Operand | Condition>,
): ExpressionAttributeNames {
  return operandsAndConditions.reduce(
    (mergedExpressionAttributeNames, operandOrCondition) => ({
      ...mergedExpressionAttributeNames,
      ...operandOrCondition.expressionAttributeNames,
    }),
    {},
  );
}

export function buildExpressionAttributeNamePlaceholder(
  documentPath: OldDocumentPath,
): string {
  return documentPath
    .map((documentPathItem) => `#${formatDocumentPathItem(documentPathItem)}`)
    .join('.');
}

export function buildExpressionAttributeNames(
  documentPath: OldDocumentPath,
): ExpressionAttributeNames {
  return documentPath
    .map((documentPathItem) => documentPathItem.attributeName)
    .reduce(
      (expressionAttributeNames, attributeName) => ({
        ...expressionAttributeNames,
        [`#${attributeName}`]: attributeName,
      }),
      {} as ExpressionAttributeNames,
    );
}
