import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { buildExpressionAttributeValuePlaceholder } from '../../expression-attribute-values.js';
import { type ValueUpdateOptions } from '../../../types.js';
import { type DocumentPath } from '../../../document-path/types.js';

export function buildStatementToSetValue(
  documentPath: DocumentPath,
  options: ValueUpdateOptions = {},
): string {
  const { preventOverwriting = false } = options;

  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(documentPath);

  if (preventOverwriting) {
    return `${expressionAttributeNamePlaceholder} = if_not_exists(${expressionAttributeNamePlaceholder}, ${expressionAttributeValuePlaceholder})`;
  }

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeValuePlaceholder}`;
}

export function buildStatementToAppendItemsToList(
  documentPath: DocumentPath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(documentPath);

  return `${expressionAttributeNamePlaceholder} = list_append(${expressionAttributeNamePlaceholder}, ${expressionAttributeValuePlaceholder})`;
}

export function buildStatementToAddNumber(documentPath: DocumentPath): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(documentPath);

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeNamePlaceholder} + ${expressionAttributeValuePlaceholder}`;
}

export function buildStatementToSubtractNumber(
  documentPath: DocumentPath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(documentPath);

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeNamePlaceholder} - ${expressionAttributeValuePlaceholder}`;
}
