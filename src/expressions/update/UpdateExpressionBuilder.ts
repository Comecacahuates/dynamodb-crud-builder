import { Set, Add, Remove, Delete } from './statements/index.js';
import type { AttributePath, ValueUpdateOptions } from '../../types.js';

export class UpdateExpressionBuilder {
  private setStatements: string[] = [];
  private addStatements: string[] = [];
  private removeStatements: string[] = [];
  private deleteStatements: string[] = [];

  public build(): string {
    return `${this.formattedSetStatements} ${this.formattedAddStatements} ${this.formattedRemoveStatements} ${this.formattedDeleteStatements}`.trim();
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

  private get formattedRemoveStatements(): string {
    if (this.removeStatements.length === 0) {
      return '';
    }

    return `REMOVE ${this.removeStatements.join(', ')}`;
  }

  private get formattedDeleteStatements(): string {
    if (this.deleteStatements.length === 0) {
      return '';
    }

    return `DELETE ${this.deleteStatements.join(', ')}`;
  }

  public setValue(
    attributePath: AttributePath,
    options?: ValueUpdateOptions,
  ): UpdateExpressionBuilder {
    const statement = Set.buildStatementToSetValue(attributePath, options);

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

  public addNumber(attributePath: AttributePath): UpdateExpressionBuilder {
    const statement = Set.buildStatementToAddNumber(attributePath);
    this.setStatements.push(statement);
    return this;
  }

  public subtractNumber(attributePath: AttributePath): UpdateExpressionBuilder {
    const statement = Set.buildStatementToSubtractNumber(attributePath);
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

  public remove(attributePath: AttributePath): UpdateExpressionBuilder {
    const statement = Remove.buildStatementToRemove(attributePath);
    this.removeStatements.push(statement);
    return this;
  }

  public delete(attributePath: AttributePath): UpdateExpressionBuilder {
    const statement = Delete.buildStatementToDelete(attributePath);
    this.deleteStatements.push(statement);
    return this;
  }
}
