import { type DocumentPathItem, type DocumentPath } from './types.js';

export function formatDocumentPathItem(
  documentPathItem: DocumentPathItem,
): string {
  const { attributeName, index } = documentPathItem;

  if (index !== undefined) {
    return `${attributeName}[${index}]`;
  }

  return attributeName;
}

export function formatDocumentPath(documentPath: DocumentPath): string {
  return documentPath.map(formatDocumentPathItem).join('.');
}
