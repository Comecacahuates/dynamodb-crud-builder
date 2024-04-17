import {
  Expression,
  type ExpressionAttributeNames,
  type ExpressionAttributeValues,
} from '../Expression.js';
import { UpdateAction, UpdateActionType } from './UpdateAction.js';

export class SetExpression extends Expression {
  private constructor(
    expressionString: string,
    expressionAttributeNames: ExpressionAttributeNames,
    expressionAttributeValues: ExpressionAttributeValues,
  ) {
    super(
      expressionString,
      expressionAttributeNames,
      expressionAttributeValues,
    );
  }

  private static createEmpty(): SetExpression {
    return new SetExpression('', {}, {});
  }

  public static createFromUpdateActions(
    updateActions: Array<UpdateAction>,
  ): SetExpression {
    const setActions = updateActions.filter(
      (action) => action.getType() === UpdateActionType.SET,
    );

    if (setActions.length === 0) {
      return SetExpression.createEmpty();
    }

    const expressionString = `SET ${setActions
      .map((action) => action.getExpressionString())
      .join(', ')}`;

    const [firstSetAction, ...otherSetActions] = setActions;

    return new SetExpression(
      expressionString,
      firstSetAction!.mergeAttributeNames(...otherSetActions),
      firstSetAction!.mergeAttributeValues(...otherSetActions),
    );
  }
}
