import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { buildExpressionAttributeValuePlaceholder } from '../../expression-attribute-values.js';
import type { DocumentPath, ValueUpdateOptions } from '../../../types.js';

export function buildStatementToSetValue(
  attributePath: DocumentPath,
  options: ValueUpdateOptions = {},
): string {
  const { preventOverwriting = false } = options;

  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath);

  if (preventOverwriting) {
    return `${expressionAttributeNamePlaceholder} = if_not_exists(${expressionAttributeNamePlaceholder}, ${expressionAttributeValuePlaceholder})`;
  }

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeValuePlaceholder}`;
}

export function buildStatementToAppendItemsToList(
  attributePath: DocumentPath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath);

  return `${expressionAttributeNamePlaceholder} = list_append(${expressionAttributeNamePlaceholder}, ${expressionAttributeValuePlaceholder})`;
}

export function buildStatementToAddNumber(attributePath: DocumentPath): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath);

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeNamePlaceholder} + ${expressionAttributeValuePlaceholder}`;
}

export function buildStatementToSubtractNumber(
  attributePath: DocumentPath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath);

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeNamePlaceholder} - ${expressionAttributeValuePlaceholder}`;
}
