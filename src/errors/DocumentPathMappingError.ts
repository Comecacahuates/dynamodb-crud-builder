import {
  type DocumentPath,
  formatDocumentPath,
} from '../document-path/index.js';

export class DocumentPathMappingError extends Error {
  public override readonly name = 'DocumentPathMappingError';

  constructor(documentPath: DocumentPath) {
    super(`There is no mapping for path "${formatDocumentPath(documentPath)}"`);
  }
}
