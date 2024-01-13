import { Set, Add, Remove, Delete } from './statements/index.js';
import { type ValueUpdateOptions } from '../../types.js';
import { type DocumentPath } from '../../document-path/types.js';

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
    documentPath: DocumentPath,
    options?: ValueUpdateOptions,
  ): UpdateExpressionBuilder {
    const statement = Set.buildStatementToSetValue(documentPath, options);

    this.setStatements.push(statement);
    return this;
  }

  public appendItemsToList(
    documentPath: DocumentPath,
  ): UpdateExpressionBuilder {
    const statement = Set.buildStatementToAppendItemsToList(documentPath);
    this.setStatements.push(statement);
    return this;
  }

  public addNumber(documentPath: DocumentPath): UpdateExpressionBuilder {
    const statement = Set.buildStatementToAddNumber(documentPath);
    this.setStatements.push(statement);
    return this;
  }

  public subtractNumber(documentPath: DocumentPath): UpdateExpressionBuilder {
    const statement = Set.buildStatementToSubtractNumber(documentPath);
    this.setStatements.push(statement);
    return this;
  }

  public addElementsToSet(documentPath: DocumentPath): UpdateExpressionBuilder {
    const statement = Add.buildAddStatement(documentPath);
    this.addStatements.push(statement);
    return this;
  }

  public remove(documentPath: DocumentPath): UpdateExpressionBuilder {
    const statement = Remove.buildStatementToRemove(documentPath);
    this.removeStatements.push(statement);
    return this;
  }

  public delete(documentPath: DocumentPath): UpdateExpressionBuilder {
    const statement = Delete.buildStatementToDelete(documentPath);
    this.deleteStatements.push(statement);
    return this;
  }
}
