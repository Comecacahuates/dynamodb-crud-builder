import { type DocumentPath } from '../document-path/index.js';

export function buildExpressionAttributeValuePlaceholder(
  documentPath: DocumentPath,
): string {
  return `:${documentPath.map(Object.values).flat().join('')}`;
}
