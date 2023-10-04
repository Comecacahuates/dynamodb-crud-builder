import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import type { PutItemInput, AttributeValue } from '@aws-sdk/client-dynamodb';
import { Attribute } from '../attribute/Attribute.js';
import type { AttributeType } from '../attribute/Attribute.js';

export class PutCommandBuilder {
  private internalPutItemInput: PutItemInput = {
    TableName: undefined,
    Item: {},
  };

  public put(
    attributeName: string,
    attributeValue: AttributeType,
  ): PutCommandBuilder {
    const dynamodbAttributeValue: AttributeValue =
      Attribute.buildDynamodbValue(attributeValue);

    this.internalPutItemInput.Item![attributeName] = dynamodbAttributeValue;
    return this;
  }

  public intoTable(tableName: string): PutCommandBuilder {
    this.internalPutItemInput.TableName = tableName;
    return this;
  }

  public later(): PutItemCommand {
    return new PutItemCommand(this.internalPutItemInput);
  }
}
