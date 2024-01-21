export class DocumentPathParsingError extends Error {
  public override readonly name = 'DocumentPathParsingError';

  constructor(documentPathString: string) {
    super(`Document path string "${documentPathString}" is not valid`);
  }
}
