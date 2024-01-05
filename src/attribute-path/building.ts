import type { AttributePath } from '../types.js';

export function getIndex(attributePathPart: string): number | null {
  const indexMatch = attributePathPart.match(/\[(\d+)\]/);
  console.log(indexMatch);

  if (!indexMatch) {
    return null;
  }

  return Number(indexMatch[1]);
}

export function getAttributeName(attributePathPart: string): string {
  return attributePathPart.replace(/\[\d+\]/, '');
}

export function buildFromString(attributePathString: string): AttributePath {
  const attributePathParts = attributePathString.split('.');
  const attributePath: AttributePath = attributePathParts
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
