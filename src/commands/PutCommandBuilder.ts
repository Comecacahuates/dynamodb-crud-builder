import { type PutItemInput, PutItemCommand } from '@aws-sdk/client-dynamodb';
import * as Attribute from '../../src/attribute-value/index.js';

export class PutCommandBuilder {
  private putItemInput: PutItemInput = {
    TableName: undefined,
    Item: {},
  };

  public build(): PutItemCommand {
    return new PutItemCommand(this.putItemInput);
  }

  public intoTable(tableName: string): PutCommandBuilder {
    this.putItemInput.TableName = tableName;
    return this;
  }

  public putNull(attributeName: string): PutCommandBuilder {
    this.putItemInput.Item![attributeName] = Attribute.NULL;
    return this;
  }

  public putString(
    attributeName: string,
    numberValue: string,
  ): PutCommandBuilder {
    const attributeValue = Attribute.buildString(numberValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putNumber(
    attributeName: string,
    stringValue: number,
  ): PutCommandBuilder {
    const attributeValue = Attribute.buildNumber(stringValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBoolean(
    attributeName: string,
    booleanValue: boolean,
  ): PutCommandBuilder {
    const attributeValue = Attribute.buildBoolean(booleanValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBinary(
    attributeName: string,
    binaryValue: Uint8Array,
  ): PutCommandBuilder {
    const attributeValue = Attribute.buildBinary(binaryValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putStringSet(
    attributeName: string,
    stringSetValue: Set<string>,
  ): PutCommandBuilder {
    const attributeValue = Attribute.buildStringSet(stringSetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putNumberSet(
    attributeName: string,
    numberSetValue: Set<number>,
  ): PutCommandBuilder {
    const attributeValue = Attribute.buildNumberSet(numberSetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putBinarySet(
    attributeName: string,
    binarySetValue: Set<Uint8Array>,
  ): PutCommandBuilder {
    const attributeValue = Attribute.buildBinarySet(binarySetValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putList(
    attributeName: string,
    listValue: Attribute.AttributeType[],
  ): PutCommandBuilder {
    const attributeValue = Attribute.build(listValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }

  public putObject(
    attributeName: string,
    mapValue: Attribute.AttributeType,
  ): PutCommandBuilder {
    const attributeValue = Attribute.build(mapValue);
    this.putItemInput.Item![attributeName] = attributeValue;
    return this;
  }
}
