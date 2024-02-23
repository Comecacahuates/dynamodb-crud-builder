export function isEmptyArray(value: unknown): value is [] {
  return Array.isArray(value) && value.length === 0;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
