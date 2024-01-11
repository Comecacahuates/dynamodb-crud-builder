import type { DocumentPath } from '../types.js';

export function getIndex(documentPathPart: string): number | null {
  const indexMatch = documentPathPart.match(/\[(\d+)\]/);

  if (!indexMatch) {
    return null;
  }

  return Number(indexMatch[1]);
}

export function getAttributeName(documentPathPart: string): string {
  return documentPathPart.replace(/\[\d+\]/, '');
}

export function buildDocumentPathFromString(
  attributePathString: string,
): DocumentPath {
  const attributePathParts = attributePathString.split('.');
  const attributePath: DocumentPath = attributePathParts
    .map((attributePathPart) => {
      const attributeName = getAttributeName(attributePathPart);
      const index = getIndex(attributePathPart);

      if (index !== null) {
        return [attributeName, index];
      }

      return [attributeName];
    })
    .flat();

  return attributePath;
}
