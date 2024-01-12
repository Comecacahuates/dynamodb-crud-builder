import {
  type DynamoDBClient,
  type UpdateItemInput,
  UpdateItemCommand,
  type TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { UpdateExpressionBuilder } from '../expressions/update/index.js';
import type {
  Item,
  AttributeType,
  DocumentPath,
  ValueUpdateOptions,
} from '../types.js';
import { parseDocumentPath } from '../document-path/index.js';
import { buildExpressionAttributeNames } from '../expressions/expression-attribute-names.js';
import { buildExpressionAttributeValue } from '../expressions/expression-attribute-values.js';
import * as Attribute from '../attribute-value/index.js';
import { UpdateItemError } from '../errors/index.js';

export class UpdateItemBuilder {
  private readonly updateExpressionBuilder = new UpdateExpressionBuilder();

  private updateItemInput: UpdateItemInput = {
    TableName: undefined,
    Key: undefined,
    UpdateExpression: undefined,
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };

  public buildCommand(): UpdateItemCommand {
    this.updateItemInput.UpdateExpression =
      this.updateExpressionBuilder.build();
    return new UpdateItemCommand(this.updateItemInput);
  }

  public buildTransactionItem(): TransactWriteItem {
    this.updateItemInput.UpdateExpression =
      this.updateExpressionBuilder.build();
    return { Update: this.updateItemInput } as unknown as TransactWriteItem;
  }

  public async run(dynamodbClient: DynamoDBClient): Promise<void> {
    try {
      const updateItemCommand = this.buildCommand();
      await dynamodbClient.send(updateItemCommand);
    } catch (error: unknown) {
      throw new UpdateItemError(error);
    }
  }

  public inTable(tableName: string): UpdateItemBuilder {
    this.updateItemInput.TableName = tableName;
    return this;
  }

  public withKey(key: Item): UpdateItemBuilder {
    this.updateItemInput.Key = key;
    return this;
  }

  private addExpressionAttributeNames(documentPath: DocumentPath) {
    const expressionAttributeNames =
      buildExpressionAttributeNames(documentPath);
    this.updateItemInput.ExpressionAttributeNames = {
      ...this.updateItemInput.ExpressionAttributeNames,
      ...expressionAttributeNames,
    };
  }

  private addExpressionAttributeValues(
    documentPath: DocumentPath,
    value: AttributeType,
  ) {
    const attributeValue = Attribute.build(value);
    const expressionAttributeValue = buildExpressionAttributeValue(
      documentPath,
      attributeValue,
    );
    this.updateItemInput.ExpressionAttributeValues = {
      ...this.updateItemInput.ExpressionAttributeValues,
      ...expressionAttributeValue,
    };
  }

  public setValue(
    documentPathString: string,
    value: AttributeType,
    options?: ValueUpdateOptions,
  ): UpdateItemBuilder {
    const documentPath = parseDocumentPath(documentPathString);

    this.updateExpressionBuilder.setValue(documentPath, options);

    this.addExpressionAttributeNames(documentPath);
    this.addExpressionAttributeValues(documentPath, value);

    return this;
  }

  public appendItemsToList(
    documentPathString: string,
    items: AttributeType[],
  ): UpdateItemBuilder {
    const documentPath = parseDocumentPath(documentPathString);

    this.updateExpressionBuilder.appendItemsToList(documentPath);

    this.addExpressionAttributeNames(documentPath);
    this.addExpressionAttributeValues(documentPath, items);

    return this;
  }

  public addNumber(
    documentPathString: string,
    number: number,
  ): UpdateItemBuilder {
    const documentPath = parseDocumentPath(documentPathString);

    this.updateExpressionBuilder.addNumber(documentPath);

    this.addExpressionAttributeNames(documentPath);
    this.addExpressionAttributeValues(documentPath, number);

    return this;
  }

  public subtractNumber(
    documentPathString: string,
    number: number,
  ): UpdateItemBuilder {
    const documentPath = parseDocumentPath(documentPathString);

    this.updateExpressionBuilder.subtractNumber(documentPath);

    this.addExpressionAttributeNames(documentPath);
    this.addExpressionAttributeValues(documentPath, number);

    return this;
  }

  public addElementsToSet(
    documentPathString: string,
    elements: Set<number> | Set<string> | Set<Uint8Array>,
  ): UpdateItemBuilder {
    const documentPath = parseDocumentPath(documentPathString);

    this.updateExpressionBuilder.addElementsToSet(documentPath);

    this.addExpressionAttributeNames(documentPath);
    this.addExpressionAttributeValues(documentPath, elements);

    return this;
  }

  public removeAttribute(documentPathString: string): UpdateItemBuilder {
    const documentPath = parseDocumentPath(documentPathString);

    this.updateExpressionBuilder.remove(documentPath);

    this.addExpressionAttributeNames(documentPath);

    return this;
  }

  public deleteElementsFromSet(
    documentPathString: string,
    elements: Set<number> | Set<string> | Set<Uint8Array>,
  ): UpdateItemBuilder {
    const documentPath = parseDocumentPath(documentPathString);

    this.updateExpressionBuilder.delete(documentPath);

    this.addExpressionAttributeNames(documentPath);
    this.addExpressionAttributeValues(documentPath, elements);

    return this;
  }
}
