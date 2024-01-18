export class DocumentPathItem {
  public constructor(
    public readonly attributeName: string,
    public readonly indexes: Array<number> = [],
  ) {}

  public static parse(documentPathItemString: string): DocumentPathItem | null {
    const attributeName = DocumentPathItem.parseAttributeName(
      documentPathItemString,
    );
    const indexes = DocumentPathItem.parseIndexes(documentPathItemString);

    if (!attributeName || !indexes) {
      return null;
    }

    return new DocumentPathItem(attributeName, indexes);
  }

  public static isParsable(documentPathItemString: string): boolean {
    const validDocumentPathItemRegex = /^[a-zA-Z]\w*(\[\d+\])*$/;
    return validDocumentPathItemRegex.test(documentPathItemString);
  }

  public static parseAttributeName(
    documentPathItemString: string,
  ): string | null {
    const attributeNameRegex = /^[a-zA-Z]\w+/;
    const match = documentPathItemString.match(attributeNameRegex);
    return match ? match[0] : null;
  }

  public static parseIndexes(
    documentPathItemString: string,
  ): Array<number> | null {
    const validIndexesRegex = /(\[\d+\])*$/;
    console.log(documentPathItemString);
    console.log(validIndexesRegex.test(documentPathItemString));
    if (!validIndexesRegex.test(documentPathItemString)) {
      return null;
    }

    const indexesRegex = /\[(\d+)\]/g;
    const matches = documentPathItemString.matchAll(indexesRegex);
    const indexes = Array.from(matches, (match) => Number(match[1]));
    return indexes;
  }
}
