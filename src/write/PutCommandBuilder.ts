import { PutItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import type {
  PutItemInput,
  AttributeValue,
  TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { Attribute } from '../attribute/Attribute.js';
import type { AttributeType } from '../attribute/Attribute.js';
import { MissingTableError, WritingToTableError } from './error/index.js';

export class PutCommandBuilder {
  private putItemInput: PutItemInput = {
    TableName: undefined,
    Item: {},
  };

  public put(
    attributeName: string,
    attributeValue: AttributeType,
  ): PutCommandBuilder {
    const dynamodbAttributeValue: AttributeValue =
      Attribute.buildDynamodbValue(attributeValue);

    this.putItemInput.Item![attributeName] = dynamodbAttributeValue;
    return this;
  }

  public intoTable(tableName: string): PutCommandBuilder {
    this.putItemInput.TableName = tableName;
    return this;
  }

  public later(): PutItemCommand {
    if (!this.putItemInput.TableName) {
      throw new MissingTableError();
    }

    return new PutItemCommand(this.putItemInput);
  }

  public async now(): Promise<void> {
    try {
      const client = new DynamoDBClient({
        region: 'us-east-1',
        endpointProvider: () => ({
          url: new URL('https://dynamodb.us-east-1.amazonaws.com'),
        }),
      });

      const putCommand = this.later();
      await client.send(putCommand);
    } catch (error) {
      throw new WritingToTableError(this.putItemInput.TableName!, error);
    }
  }

  public inTransaction(): TransactWriteItem {
    if (!this.putItemInput.TableName) {
      throw new MissingTableError();
    }

    return { Put: this.putItemInput };
  }
}
