export function buildPlaceholderFromAttributeName(
  attributeName: string,
): string {
  return `#${attributeName}`;
}

export function buildPlaceholderFromAttributePath(
  attributePath: Array<string>,
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
  attributePath: Array<string>,
): Record<string, string> {
  return attributePath.reduce(
    (attributeNames, pathPart) => ({
      ...attributeNames,
      ...buildFromAttributeName(pathPart),
    }),
    {},
  );
}
