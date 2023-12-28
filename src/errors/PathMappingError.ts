export class PathMappingError extends Error {
  constructor(path: Array<string>) {
    super(`There is no mapping for path "${path.join('.')}"`);
  }
}
