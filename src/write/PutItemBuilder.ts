import {
  type PutItemInput,
  type DynamoDBClient,
  PutItemCommand,
  TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import * as Attribute from '../attribute-value/index.js';
import { PutItemError } from '../errors/index.js';

export class PutItemBuilder {
  private putItemInput: PutItemInput = {
    TableName: undefined,
    Item: {},
  };

  public intoTable(tableName: string): PutItemBuilder {
    this.putItemInput.TableName = tableName;
    return this;
  }

  public putNull(attributeName: string): PutItemBuilder {
    this.putItemInput.Item![attributeName] = Attribute.NULL;
    return this;
  }

  public putString(attributeName: string, numberValue: string): PutItemBuilder {
    const attributeValue = Attribute.buildString(numberValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putNumber(attributeName: string, stringValue: number): PutItemBuilder {
    const attributeValue = Attribute.buildNumber(stringValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBoolean(
    attributeName: string,
    booleanValue: boolean,
  ): PutItemBuilder {
    const attributeValue = Attribute.buildBoolean(booleanValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBinary(
    attributeName: string,
    binaryValue: Uint8Array,
  ): PutItemBuilder {
    const attributeValue = Attribute.buildBinary(binaryValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putStringSet(
    attributeName: string,
    stringSetValue: Set<string>,
  ): PutItemBuilder {
    const attributeValue = Attribute.buildStringSet(stringSetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putNumberSet(
    attributeName: string,
    numberSetValue: Set<number>,
  ): PutItemBuilder {
    const attributeValue = Attribute.buildNumberSet(numberSetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBinarySet(
    attributeName: string,
    binarySetValue: Set<Uint8Array>,
  ): PutItemBuilder {
    const attributeValue = Attribute.buildBinarySet(binarySetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putList(
    attributeName: string,
    listValue: Attribute.AttributeType[],
  ): PutItemBuilder {
    const attributeValue = Attribute.build(listValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putObject(
    attributeName: string,
    mapValue: { [key: string]: Attribute.AttributeType },
  ): PutItemBuilder {
    const attributeValue = Attribute.build(mapValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public buildCommand(): PutItemCommand {
    return new PutItemCommand(this.putItemInput);
  }

  public buildTransactionItem(): TransactWriteItem {
    return { Put: this.putItemInput };
  }

  public async run(dynamodbClient: DynamoDBClient): Promise<void> {
    try {
      const putItemCommand = this.buildCommand();
      await dynamodbClient.send(putItemCommand);
    } catch (error: unknown) {
      throw new PutItemError(error);
    }
  }
}
