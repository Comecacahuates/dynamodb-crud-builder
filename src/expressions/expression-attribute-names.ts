import {
  type DocumentPath,
  formatDocumentPathItem,
} from '../document-path/index.js';

export function buildExpressionAttributeNamePlaceholder(
  documentPath: DocumentPath,
): string {
  return documentPath
    .map((documentPathItem) => `#${formatDocumentPathItem(documentPathItem)}`)
    .join('.');
}
