import type { AttributePath } from '../types.js';

export function buildFromString(path: string): AttributePath {
  return path.split('.');
}
