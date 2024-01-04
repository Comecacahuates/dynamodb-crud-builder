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
  ): UpdateExpressionBuilder;
  public setValue(
    attributePath: AttributePath,
    index: number,
    options?: ValueUpdateOptions,
  ): UpdateExpressionBuilder;
  public setValue(
    attributePath: AttributePath,
    optionsOrIndex?: ValueUpdateOptions | number,
    options: ValueUpdateOptions = {},
  ): UpdateExpressionBuilder {
    let actualIndex: number | undefined;
    let actualOptions: ValueUpdateOptions;
    let statement: string;

    if (typeof optionsOrIndex === 'number') {
      actualIndex = optionsOrIndex;
      actualOptions = options;
      statement = Set.buildStatementToSetValue(
        attributePath,
        actualIndex,
        actualOptions,
      );
    } else {
      actualOptions = optionsOrIndex ?? {};
      statement = Set.buildStatementToSetValue(attributePath, actualOptions);
    }

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

  public addNumber(
    attributePath: AttributePath,
    index?: number,
  ): UpdateExpressionBuilder {
    const statement = Set.buildStatementToAddNumber(attributePath, index);
    this.setStatements.push(statement);
    return this;
  }
}
