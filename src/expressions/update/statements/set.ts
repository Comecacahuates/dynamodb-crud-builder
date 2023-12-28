import * as ExpressionAttributeNames from '../../expression-attribute-names.js';
import * as ExpressionAttributeValues from '../../expression-attribute-values.js';

export function buildAssignValueStatement(
  attributePath: Array<string>,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} = ${attributeValuePlaceholder}`;
}

export function buildAssignItemOfList(
  attributePath: Array<string>,
  index: number,
): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder}[${index}] = ${attributeValuePlaceholder}`;
}
