import * as ExpressionAttributeNames from '../../expression-attribute-names.js';
import * as ExpressionAttributeValues from '../../expression-attribute-values.js';
import { type AttributePath } from '../../../types.js';

export type Options = {
  preventOverwriting?: boolean;
};

export function buildAssignValueStatement(
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

export function buildAssignItemOfListStatement(
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

export function buildAppendItemToListStatement(
  attributePath: AttributePath,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = list_append(${attributePathPlaceholder}, ${attributeValuePlaceholder})`;
}

export function buildAddNumberStatement(attributePath: AttributePath): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = ${attributePathPlaceholder} + ${attributeValuePlaceholder}`;
}

export function buildSubtractNumberStatement(
  attributePath: AttributePath,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = ${attributePathPlaceholder} - ${attributeValuePlaceholder}`;
}
