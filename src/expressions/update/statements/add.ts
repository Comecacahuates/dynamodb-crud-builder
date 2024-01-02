import * as ExpressionAttributeNames from '../../expression-attribute-names.js';
import * as ExpressionAttributeValues from '../../expression-attribute-values.js';
import { type AttributePath } from '../../../types.js';

export function buildAddNumberStatement(attributePath: AttributePath): string {
  const attributePathPlaceholder =
    ExpressionAttributeNames.buildPlaceholderFromAttributePath(attributePath);
  const attributeValuePlaceholder =
    ExpressionAttributeValues.buildPlaceholderFromAttributePath(attributePath);

  return `${attributePathPlaceholder} ${attributeValuePlaceholder}`;
}
