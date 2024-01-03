import {
  type PutItemInput,
  type DynamoDBClient,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import * as Attribute from '../../src/attribute-value/index.js';
import { PutItemError } from '../errors/index.js';

export class PutItemInputBuilder {
  private putItemInput: PutItemInput = {
    TableName: undefined,
    Item: {},
  };

  public build(): PutItemInput {
    return this.putItemInput;
  }

  public intoTable(tableName: string): PutItemInputBuilder {
    this.putItemInput.TableName = tableName;
    return this;
  }

  public putNull(attributeName: string): PutItemInputBuilder {
    this.putItemInput.Item![attributeName] = Attribute.NULL;
    return this;
  }

  public putString(
    attributeName: string,
    numberValue: string,
  ): PutItemInputBuilder {
    const attributeValue = Attribute.buildString(numberValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putNumber(
    attributeName: string,
    stringValue: number,
  ): PutItemInputBuilder {
    const attributeValue = Attribute.buildNumber(stringValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBoolean(
    attributeName: string,
    booleanValue: boolean,
  ): PutItemInputBuilder {
    const attributeValue = Attribute.buildBoolean(booleanValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBinary(
    attributeName: string,
    binaryValue: Uint8Array,
  ): PutItemInputBuilder {
    const attributeValue = Attribute.buildBinary(binaryValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putStringSet(
    attributeName: string,
    stringSetValue: Set<string>,
  ): PutItemInputBuilder {
    const attributeValue = Attribute.buildStringSet(stringSetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putNumberSet(
    attributeName: string,
    numberSetValue: Set<number>,
  ): PutItemInputBuilder {
    const attributeValue = Attribute.buildNumberSet(numberSetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBinarySet(
    attributeName: string,
    binarySetValue: Set<Uint8Array>,
  ): PutItemInputBuilder {
    const attributeValue = Attribute.buildBinarySet(binarySetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putList(
    attributeName: string,
    listValue: Attribute.AttributeType[],
  ): PutItemInputBuilder {
    const attributeValue = Attribute.build(listValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putObject(
    attributeName: string,
    mapValue: { [key: string]: Attribute.AttributeType },
  ): PutItemInputBuilder {
    const attributeValue = Attribute.build(mapValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public async run(dynamodbClient: DynamoDBClient): Promise<void> {
    try {
      await dynamodbClient.send(new PutItemCommand(this.putItemInput));
    } catch (error: unknown) {
      throw new PutItemError(error);
    }
  }
}
