import { type AttributePath } from '../types.js';

export function buildPlaceholderFromAttributeName(
  attributeName: string,
): string {
  return `#${attributeName}`;
}

export function buildPlaceholderFromAttributePath(
  attributePath: AttributePath,
): string {
  return attributePath.map(buildPlaceholderFromAttributeName).join('.');
}

export function buildFromAttributeName(
  attributeName: string,
): Record<string, string> {
  const placeholder = buildPlaceholderFromAttributeName(attributeName);
  return {
    [placeholder]: attributeName,
  };
}

export function buildFromAttributePath(
  attributePath: AttributePath,
): Record<string, string> {
  return attributePath.reduce(
    (attributeNames, pathPart) => ({
      ...attributeNames,
      ...buildFromAttributeName(pathPart),
    }),
    {},
  );
}
