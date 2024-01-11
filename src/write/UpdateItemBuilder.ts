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
  AttributePath,
  ValueUpdateOptions,
} from '../types.js';
import { buildAttributePathFromString } from '../attribute-path/index.js';
import { buildExpressionAttributeNames } from '../expressions/expression-attribute-names.js';
import { buildExpressionAttributeValue } from '../expressions/expression-attribute-values.js';
import * as Attribute from '../attribute/index.js';
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

  private addExpressionAttributeNames(attributePath: AttributePath) {
    const expressionAttributeNames =
      buildExpressionAttributeNames(attributePath);
    this.updateItemInput.ExpressionAttributeNames = {
      ...this.updateItemInput.ExpressionAttributeNames,
      ...expressionAttributeNames,
    };
  }

  private addExpressionAttributeValues(
    attributePath: AttributePath,
    value: AttributeType,
  ) {
    const attributeValue = Attribute.build(value);
    const expressionAttributeValue = buildExpressionAttributeValue(
      attributePath,
      attributeValue,
    );
    this.updateItemInput.ExpressionAttributeValues = {
      ...this.updateItemInput.ExpressionAttributeValues,
      ...expressionAttributeValue,
    };
  }

  public setValue(
    attributePathString: string,
    value: AttributeType,
    options?: ValueUpdateOptions,
  ): UpdateItemBuilder {
    const attributePath = buildAttributePathFromString(attributePathString);

    this.updateExpressionBuilder.setValue(attributePath, options);

    this.addExpressionAttributeNames(attributePath);
    this.addExpressionAttributeValues(attributePath, value);

    return this;
  }

  public appendItemsToList(
    attributePathString: string,
    items: AttributeType[],
  ): UpdateItemBuilder {
    const attributePath = buildAttributePathFromString(attributePathString);

    this.updateExpressionBuilder.appendItemsToList(attributePath);

    this.addExpressionAttributeNames(attributePath);
    this.addExpressionAttributeValues(attributePath, items);

    return this;
  }

  public addNumber(
    attributePathString: string,
    number: number,
  ): UpdateItemBuilder {
    const attributePath = buildAttributePathFromString(attributePathString);

    this.updateExpressionBuilder.addNumber(attributePath);

    this.addExpressionAttributeNames(attributePath);
    this.addExpressionAttributeValues(attributePath, number);

    return this;
  }

  public subtractNumber(
    attributePathString: string,
    number: number,
  ): UpdateItemBuilder {
    const attributePath = buildAttributePathFromString(attributePathString);

    this.updateExpressionBuilder.subtractNumber(attributePath);

    this.addExpressionAttributeNames(attributePath);
    this.addExpressionAttributeValues(attributePath, number);

    return this;
  }

  public addElementsToSet(
    attributePathString: string,
    elements: Set<number> | Set<string> | Set<Uint8Array>,
  ): UpdateItemBuilder {
    const attributePath = buildAttributePathFromString(attributePathString);

    this.updateExpressionBuilder.addElementsToSet(attributePath);

    this.addExpressionAttributeNames(attributePath);
    this.addExpressionAttributeValues(attributePath, elements);

    return this;
  }

  public removeAttribute(attributePathString: string): UpdateItemBuilder {
    const attributePath = buildAttributePathFromString(attributePathString);

    this.updateExpressionBuilder.remove(attributePath);

    this.addExpressionAttributeNames(attributePath);

    return this;
  }

  public deleteElementsFromSet(
    attributePathString: string,
    elements: Set<number> | Set<string> | Set<Uint8Array>,
  ): UpdateItemBuilder {
    const attributePath = buildAttributePathFromString(attributePathString);

    this.updateExpressionBuilder.delete(attributePath);

    this.addExpressionAttributeNames(attributePath);
    this.addExpressionAttributeValues(attributePath, elements);

    return this;
  }
}
