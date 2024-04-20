import { type Expression } from '../Expression.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';

export enum UpdateActionType {
  SET = 'SET',
  REMOVE = 'REMOVE',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

export const UPDATE_ACTION_TYPES = Object.values(UpdateActionType);

export type UpdateActions = UpdateAction[];

export class UpdateAction implements Expression {
  public constructor(
    private readonly type: UpdateActionType,
    private expressionString: string,
    private attributeNames: AttributeNames = new AttributeNames(),
    private attributeValues: AttributeValues = new AttributeValues(),
  ) {}

  public getType(): UpdateActionType {
    return this.type;
  }

  public getString(): string {
    return this.expressionString;
  }

  public getAttributeNames(): AttributeNames {
    return this.attributeNames;
  }

  getAttributeValues(): AttributeValues {
    return this.attributeValues;
  }
}
