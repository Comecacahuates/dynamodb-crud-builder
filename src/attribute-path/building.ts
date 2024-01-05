import type { AttributePath } from '../types.js';

export function getIndexFromAttributePathPart(
  attributePathPart: string,
): number | null {
  const indexMatch = attributePathPart.match(/\[(\d+)\]/);
  console.log(indexMatch);

  if (!indexMatch) {
    return null;
  }

  return Number(indexMatch[1]);
}

export function getAttributeNameFromAttributePathPart(
  attributePathPart: string,
): string {
  return attributePathPart.replace(/\[\d+\]/, '');
}

export function buildFromString(pathString: string): AttributePath {
  const pathParts = pathString.split('.');
  /(ab)|(cd)/.exec('cd');
}
