import * as ExpressionAttributeNames from '../../expression-attribute-names.js';
import * as ExpressionAttributeValues from '../../expression-attribute-values.js';
import { type AttributePath } from '../../../types.js';

export type Options = {
  preventOverwriting?: boolean;
};

export function buildStatementToSetValue(
  attributePath: AttributePath,
  options: Options = {},
): string {
  const { preventOverwriting = false } = options;

  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  if (preventOverwriting) {
    return `${attributePathPlaceholder} = if_not_exists(${attributePathPlaceholder}, ${attributeValuePlaceholder})`;
  }

  return `${attributePathPlaceholder} = ${attributeValuePlaceholder}`;
}

export function buildStatementToSetValueOfListItem(
  attributePath: AttributePath,
  index: number,
  options: Options = {},
): string {
  const { preventOverwriting = false } = options;

  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  const itemPathPlaceholder = `${attributePathPlaceholder}[${index}]`;

  if (preventOverwriting) {
    return `${itemPathPlaceholder} = if_not_exists(${itemPathPlaceholder}, ${attributeValuePlaceholder})`;
  }

  return `${itemPathPlaceholder} = ${attributeValuePlaceholder}`;
}

export function buildStatementToAppendItemToList(
  attributePath: AttributePath,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = list_append(${attributePathPlaceholder}, ${attributeValuePlaceholder})`;
}

export function buildStatementToAddNumber(
  attributePath: AttributePath,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = ${attributePathPlaceholder} + ${attributeValuePlaceholder}`;
}

export function buildStatementToSubtractNumber(
  attributePath: AttributePath,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = ${attributePathPlaceholder} - ${attributeValuePlaceholder}`;
}
