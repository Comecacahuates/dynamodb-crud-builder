import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { buildExpressionAttributeValuePlaceholder } from '../../expression-attribute-values.js';
import type { AttributePath, ValueUpdateOptions } from '../../../types.js';

export function buildStatementToSetValue(
  attributePath: AttributePath,
  options?: ValueUpdateOptions,
): string;
export function buildStatementToSetValue(
  attributePath: AttributePath,
  index: number,
  options?: ValueUpdateOptions,
): string;
export function buildStatementToSetValue(
  attributePath: AttributePath,
  optionsOrIndex?: ValueUpdateOptions | number,
  options: ValueUpdateOptions = {},
): string {
  let index: number | undefined;
  let actualOptions: ValueUpdateOptions;

  if (typeof optionsOrIndex === 'number') {
    index = optionsOrIndex;
    actualOptions = options;
  } else {
    actualOptions = optionsOrIndex ?? {};
  }

  const { preventOverwriting = false } = actualOptions;

  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath, index);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath, index);

  if (preventOverwriting) {
    return `${expressionAttributeNamePlaceholder} = if_not_exists(${expressionAttributeNamePlaceholder}, ${expressionAttributeValuePlaceholder})`;
  }

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeValuePlaceholder}`;
}

export function buildStatementToAppendItemsToList(
  attributePath: AttributePath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath);

  return `${expressionAttributeNamePlaceholder} = list_append(${expressionAttributeNamePlaceholder}, ${expressionAttributeValuePlaceholder})`;
}

export function buildStatementToAddNumber(
  attributePath: AttributePath,
  index?: number,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath, index);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath, index);

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeNamePlaceholder} + ${expressionAttributeValuePlaceholder}`;
}

export function buildStatementToSubtractNumber(
  attributePath: AttributePath,
  index?: number,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(attributePath, index);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(attributePath, index);

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeNamePlaceholder} - ${expressionAttributeValuePlaceholder}`;
}
