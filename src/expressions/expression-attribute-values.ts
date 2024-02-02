import { type AttributeValue } from '@aws-sdk/client-dynamodb';
import { type ExpressionAttributeValues } from './types.js';
import { type DocumentPath } from '../document-path/index.js';
import { type Operand } from './operands/Operand.js';
import { type Condition } from './conditions/Condition.js';

export function mergeExpressionAttributeValues(
  operandsAndConditions: Array<Operand | Condition>,
): ExpressionAttributeValues {
  return operandsAndConditions.reduce(
    (mergedExpressionAttributeValues, operandOrCondition) => ({
      ...mergedExpressionAttributeValues,
      ...operandOrCondition.attributeValues,
    }),
    {},
  );
}

export function buildExpressionAttributeValuePlaceholder(
  documentPath: DocumentPath,
): string {
  return `:${documentPath.map(Object.values).flat().join('')}`;
}

export function buildExpressionAttributeValue(
  documentPath: DocumentPath,
  attributeValue: AttributeValue,
): ExpressionAttributeValues {
  const placeholder = buildExpressionAttributeValuePlaceholder(documentPath);

  return {
    [placeholder]: attributeValue,
  };
}
