import {
  type DocumentPath,
  formatDocumentPath,
} from '../document-path/index.js';

export class PathMappingError extends Error {
  constructor(documentPath: DocumentPath) {
    super(`There is no mapping for path "${formatDocumentPath(documentPath)}"`);
  }
}
