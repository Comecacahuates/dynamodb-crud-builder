export class Condition {
  public constructor(public readonly symbolicValue: string) {}

  public and(...conditions: Array<Condition>): Condition {
    const allConditions = [this, ...conditions];
    const conjunction = allConditions
      .map((condition) => condition.symbolicValue)
      .join(' AND ');

    return new Condition(`(${conjunction})`);
  }

  public or(...conditions: Array<Condition>): Condition {
    const allConditions = [this, ...conditions];
    const disjunction = allConditions
      .map((condition) => condition.symbolicValue)
      .join(' OR ');

    return new Condition(`(${disjunction})`);
  }

  public not(): Condition {
    return new Condition(`(NOT ${this.symbolicValue})`);
  }
}
