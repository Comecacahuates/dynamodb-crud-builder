import { type Expression } from '../Expression.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';
import {
  type UpdateAction,
  type UpdateActions,
  type UpdateActionType,
  UPDATE_ACTION_TYPES,
} from './UpdateAction.js';
import { isEmptyArray, isNull } from '../../utils/assert.js';

export class UpdateExpression implements Expression {
  private readonly actions: Array<UpdateAction> = [];

  public getString(): string {
    return UPDATE_ACTION_TYPES.map((actionType) =>
      this.buildUpdateExpressionStringByActionType(actionType),
    )
      .filter((expressionString) => !isNull(expressionString))
      .join(' ');
  }

  public getAttributeNames(): AttributeNames {
    return AttributeNames.merge(
      this.actions.map((eachAction) => eachAction.getAttributeNames()),
    );
  }

  public getAttributeValues(): AttributeValues {
    return AttributeValues.merge(
      this.actions.map((eachAction) => eachAction.getAttributeValues()),
    );
  }

  public addAction(action: UpdateAction): UpdateExpression {
    this.actions.push(action);
    return this;
  }

  public addActions(...actions: UpdateActions): UpdateExpression {
    this.actions.push(...actions);
    return this;
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
