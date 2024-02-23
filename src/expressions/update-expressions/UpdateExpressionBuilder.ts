import {
  type UpdateAction,
  type UpdateActionType,
  UPDATE_ACTION_TYPES,
} from './UpdateAction.js';
import {
  Expression,
  ExpressionAttributeValues,
  type ExpressionAttributeNames,
} from '../Expression.js';
import { isEmptyArray, isNull } from '../../utils/assert.js';

export class UpdateExpressionBuilder {
  private readonly actions: Array<UpdateAction> = [];

  public addAction(action: UpdateAction): UpdateExpressionBuilder {
    this.actions.push(action);
    return this;
  }

  public build(): Expression {
    return new Expression(
      this.buildUpdateExpressionString(),
      this.buildAttributeNames(),
      this.buildAttributeValues(),
    );
  }

  private buildUpdateExpressionString(): string {
    return UPDATE_ACTION_TYPES.map((actionType) =>
      this.buildUpdateExpressionStringByActionType(actionType),
    )
      .filter((expressionString) => !isNull(expressionString))
      .join(' ');
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
    return actions.map((action) => action.getExpressionString()).join(', ');
  }

  private buildAttributeNames(): ExpressionAttributeNames {
    if (isEmptyArray(this.actions)) {
      return {};
    }

    const [firstAction, ...otherActions] = this.actions;
    return firstAction!.mergeAttributeNames(...otherActions);
  }

  private buildAttributeValues(): ExpressionAttributeValues {
    if (isEmptyArray(this.actions)) {
      return {};
    }

    const [firstAction, ...otherActions] = this.actions;
    return firstAction!.mergeAttributeValues(...otherActions);
  }
}
