import { type DocumentPath } from './types.js';

export function getIndex(documentPathItemString: string): number | undefined {
  const indexMatch = documentPathItemString.match(/\[(\d+)\]/);

  if (!indexMatch) {
    return undefined;
  }

  return Number(indexMatch[1]);
}

export function getAttributeName(documentPathItemString: string): string {
  return documentPathItemString.replace(/\[\d+\]/, '');
}

export function parseDocumentPathItem(documentPathItemString: string) {
  const attributeName = getAttributeName(documentPathItemString);
  const index = getIndex(documentPathItemString);

  return { attributeName, index };
}

export function parseDocumentPath(documentPathString: string): DocumentPath {
  return documentPathString.split('.').map(parseDocumentPathItem);
}
