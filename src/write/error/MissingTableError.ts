export class MissingTableError extends Error {
  public override readonly name = 'MissingTableError';

  public constructor() {
    super('Missing table name to execute write command');
  }
}
