import type { AttributePath } from '../../types.js';
import { Set } from './statements/index.js';

export class UpdateExpressionBuilder {
  private setStatements: string[] = [];

  public build(): string {
    const setStatements = `SET ${this.setStatements.join(', ')}`;
    return `${setStatements}`;
  }

  public setValue(attributePath: AttributePath): UpdateExpressionBuilder {
    const statement = Set.buildStatementToSetValue(attributePath);
    this.setStatements.push(statement);
    return this;
  }
}
