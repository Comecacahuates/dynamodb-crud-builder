import { Condition } from '../conditions/Condition.js';

export class Operand {
  public constructor(public readonly symbolicValue: string) {}

  public equals(otherOperand: Operand): Condition {
    return new Condition(
      `${this.symbolicValue} = ${otherOperand.symbolicValue}`,
    );
  }
}
