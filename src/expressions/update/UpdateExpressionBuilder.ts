import { Set } from './statements/index.js';
import type { AttributePath, ValueUpdateOptions } from '../../types.js';

export class UpdateExpressionBuilder {
  private setStatements: string[] = [];

  public build(): string {
    const setStatements = `SET ${this.setStatements.join(', ')}`;
    return `${setStatements}`;
  }

  public setValue(
    attributePath: AttributePath,
    options?: ValueUpdateOptions,
  ): UpdateExpressionBuilder {
    const statement = Set.buildStatementToSetValue(attributePath, options);
    this.setStatements.push(statement);
    return this;
  }

  public setValueOfListItem(
    attributePath: AttributePath,
    index: number,
  ): UpdateExpressionBuilder {
    const statement = Set.buildStatementToSetValue(attributePath, index);
    this.setStatements.push(statement);
    return this;
  }

  public appendItemsToList(
    attributePath: AttributePath,
  ): UpdateExpressionBuilder {
    const statement = Set.buildStatementToAppendItemsToList(attributePath);
    this.setStatements.push(statement);
    return this;
  }
}
