import * as ExpressionAttributeNames from '../../expression-attribute-names.js';
import * as ExpressionAttributeValues from '../../expression-attribute-values.js';

export type Options = {
  preventOverwriting?: boolean;
};

export function buildAssignValueStatement(
  attributePath: Array<string>,
  options: Options = {},
): string {
  const { preventOverwriting: avoidOverwriting = false } = options;

  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  if (avoidOverwriting) {
    return `${attributePathPlaceholder} = if_not_exists(${attributePathPlaceholder}, ${attributeValuePlaceholder})`;
  }

  return `${attributePathPlaceholder} = ${attributeValuePlaceholder}`;
}

export function buildAssignItemOfListStatement(
  attributePath: Array<string>,
  index: number,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder}[${index}] = ${attributeValuePlaceholder}`;
}

export function buildAppendItemToListStatement(
  attributePath: Array<string>,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = list_append(${attributePathPlaceholder}, ${attributeValuePlaceholder})`;
}

export function buildAddValueStatement(attributePath: Array<string>): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = ${attributePathPlaceholder} + ${attributeValuePlaceholder}`;
}
