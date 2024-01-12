import {
  type DocumentPathItem,
  formatDocumentPathItem,
} from '../document-path/index.js';

export class DocumentPathItemMappingError extends Error {
  public override readonly name = 'DocumentPathItemMappingError';

  constructor(documentPathItem: DocumentPathItem) {
    super(
      `There is no mapping for path item "${formatDocumentPathItem(
        documentPathItem,
      )}"`,
    );
  }
}
