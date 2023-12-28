export function buildPlaceholder(attributeName: string): string {
  return `#${attributeName}`;
}

export function buildFromAttributeName(
  attributeName: string,
): Record<string, string> {
  const placeholder = buildPlaceholder(attributeName);
  return {
    [placeholder]: attributeName,
  };
}
