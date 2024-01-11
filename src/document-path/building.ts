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
  documentPathString: string,
): DocumentPath {
  const documentPathParts = documentPathString.split('.');
  const documentPath: DocumentPath = documentPathParts
    .map((documentPathPart) => {
      const attributeName = getAttributeName(documentPathPart);
      const index = getIndex(documentPathPart);

      if (index !== null) {
        return [attributeName, index];
      }

      return [attributeName];
    })
    .flat();

  return documentPath;
}
