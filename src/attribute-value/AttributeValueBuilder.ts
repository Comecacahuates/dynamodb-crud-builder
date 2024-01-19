import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { match, P } from 'ts-pattern';
import { type AttributeType } from '../types.js';

export class AttributeValueBuilder {
  private constructor() {}

  private static internalInstance: AttributeValueBuilder;

  public static get instance(): AttributeValueBuilder {
    this.internalInstance ??= new AttributeValueBuilder();
    return this.internalInstance;
  }

  public buildNull(): AttributeValue {
    return { NULL: true };
  }
}
