export class Condition {
  public constructor(private readonly symbolicValue: string) {}

  public and(...conditions: Array<Condition>): Condition {
    const allConditions = [this, ...conditions];
    const conjunction = allConditions
      .map((condition) => condition.symbolicValue)
      .join(' AND ');

    return new Condition(`(${conjunction})`);
  }
}
