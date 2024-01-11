import { type DocumentPath } from '../types.js';

export class PathMappingError extends Error {
  constructor(path: DocumentPath) {
    super(`There is no mapping for path "${path.join('.')}"`);
  }
}
