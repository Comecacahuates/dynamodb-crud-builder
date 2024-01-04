import { Set, Add } from './statements/index.js';
import type { AttributePath, ValueUpdateOptions } from '../../types.js';

export class UpdateExpressionBuilder {
  private setStatements: string[] = [];
  private addStatements: string[] = [];

  public build(): string {
    return `${this.formattedSetStatements} ${this.formattedAddStatements}`.trim();
  }

  private get formattedSetStatements(): string {
    if (this.setStatements.length === 0) {
      return '';
    }

    return `SET ${this.setStatements.join(', ')}`;
  }

  private get formattedAddStatements(): string {
    if (this.addStatements.length === 0) {
      return '';
    }

    return `ADD ${this.addStatements.join(', ')}`;
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

  public subtractNumber(
    attributePath: AttributePath,
    index?: number,
  ): UpdateExpressionBuilder {
    const statement = Set.buildStatementToSubtractNumber(attributePath, index);
    this.setStatements.push(statement);
    return this;
  }

  public addElementsToSet(
    attributePath: AttributePath,
  ): UpdateExpressionBuilder {
    const statement = Add.buildStatementToAdd(attributePath);
    this.addStatements.push(statement);
    return this;
  }
}
