import { type DocumentPathItem } from './types.js';

export function formatDocumentPathItem(
  documentPathItem: DocumentPathItem,
): string {
  const { attributeName, index } = documentPathItem;

  if (index !== undefined) {
    return `${attributeName}[${index}]`;
  }

  return attributeName;
}
