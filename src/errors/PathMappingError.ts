import { type AttributePath } from '../types.js';

export class PathMappingError extends Error {
  constructor(path: AttributePath) {
    super(`There is no mapping for path "${path.join('.')}"`);
  }
}
