import type { AttributePath } from '../types.js';

export function buildFromString(pathString: string): AttributePath {
  return pathString.split('.');
}
