export class DocumentPathItem {
  private constructor(public readonly attributeName: string) {}

  public static parseAttributeName(
    documentPathItemString: string,
  ): string | null {
    const attributeNameRegex = /^[a-zA-Z]\w+/;
    const match = documentPathItemString.match(attributeNameRegex);
    return match ? match[0] : null;
  }

  public static parseIndexes(documentPathItemString: string): Array<number> {
    const indexesRegex = /\[(\d+)\]/g;
    const matches = documentPathItemString.matchAll(indexesRegex);
    const indexes = Array.from(matches, (match) => Number(match[1]));
    return indexes;
  }
}
