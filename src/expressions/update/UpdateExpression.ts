import { type Expression } from '../Expression.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';
import {
  type UpdateAction,
  type UpdateActionType,
  UPDATE_ACTION_TYPES,
} from './UpdateAction.js';
import { isEmptyArray, isNull } from '../../utils/assert.js';

export class UpdateExpression implements Expression {
  private readonly actions: Array<UpdateAction> = [];

  public addAction(action: UpdateAction): UpdateExpression {
    this.actions.push(action);
    return this;
  }

  public getString(): string {
    return UPDATE_ACTION_TYPES.map((actionType) =>
      this.buildUpdateExpressionStringByActionType(actionType),
    )
      .filter((expressionString) => !isNull(expressionString))
      .join(' ');
  }

  getAttributeNames(): AttributeNames {
    return AttributeNames.merge(
      this.actions.map((eachAction) => eachAction.getAttributeNames()),
    );
  }

  getAttributeValues(): AttributeValues {
    return AttributeValues.merge(
      this.actions.map((eachAction) => eachAction.getAttributeValues()),
    );
  }

  private buildUpdateExpressionStringByActionType(
    actionType: UpdateActionType,
  ): string | null {
    const actions = this.actions.filter(
      (action) => action.getType() === actionType,
    );

    return isEmptyArray(actions)
      ? null
      : `${actionType} ${this.formatActions(actions)}`;
  }

  private formatActions(actions: Array<UpdateAction>): string {
    return actions.map((action) => action.getString()).join(', ');
  }
}
