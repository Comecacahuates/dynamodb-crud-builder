export function isEmptyArray(value: unknown): value is [] {
  return Array.isArray(value) && value.length === 0;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}
