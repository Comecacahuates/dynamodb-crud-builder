export class DocumentPathItem {
  private constructor(public readonly attributeName: string) {}

  public static parseAttributeName(
    documentPathItemString: string,
  ): string | null {
    const attributeNameRegex = /^[a-zA-Z]\w+/;
    const match = documentPathItemString.match(attributeNameRegex);
    return match ? match[0] : null;
  }
}
