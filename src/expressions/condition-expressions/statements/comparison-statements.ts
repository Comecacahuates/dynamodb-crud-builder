import { buildExpressionAttributeNamePlaceholder } from '../../expression-attribute-names.js';
import { buildExpressionAttributeValuePlaceholder } from '../../expression-attribute-values.js';
import { type DocumentPath } from '../../../document-path/types.js';

export function buildEqualsComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} = ${operandB}`;
}

export function buildAttributeEqualsAttributeStatement(
  documentPathA: DocumentPath,
  documentPathB: DocumentPath,
): string {
  const expressionAttributeNamePlaceholderA =
    buildExpressionAttributeNamePlaceholder(documentPathA);

  const expressionAttributeNamePlaceholderB =
    buildExpressionAttributeNamePlaceholder(documentPathB);

  return `${expressionAttributeNamePlaceholderA} = ${expressionAttributeNamePlaceholderB}`;
}

export function buildAttributeEqualsLiteralStatement(
  documentPath: DocumentPath,
  documentPathForLiteral: DocumentPath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(documentPathForLiteral);

  return `${expressionAttributeNamePlaceholder} = ${expressionAttributeValuePlaceholder}`;
}

export function buildAttributeNotEqualsAttributeStatement(
  documentPathA: DocumentPath,
  documentPathB: DocumentPath,
): string {
  const expressionAttributeNamePlaceholderA =
    buildExpressionAttributeNamePlaceholder(documentPathA);

  const expressionAttributeNamePlaceholderB =
    buildExpressionAttributeNamePlaceholder(documentPathB);

  return `${expressionAttributeNamePlaceholderA} <> ${expressionAttributeNamePlaceholderB}`;
}

export function buildAttributeNotEqualsLiteralStatement(
  documentPath: DocumentPath,
  documentPathForLiteral: DocumentPath,
): string {
  const expressionAttributeNamePlaceholder =
    buildExpressionAttributeNamePlaceholder(documentPath);
  const expressionAttributeValuePlaceholder =
    buildExpressionAttributeValuePlaceholder(documentPathForLiteral);

  return `${expressionAttributeNamePlaceholder} <> ${expressionAttributeValuePlaceholder}`;
}

export function buildAttributeIsLessThanAttributeStatement(
  documentPathA: DocumentPath,
  documentPathB: DocumentPath,
): string {
  const expressionAttributeNamePlaceholderA =
    buildExpressionAttributeNamePlaceholder(documentPathA);

  const expressionAttributeNamePlaceholderB =
    buildExpressionAttributeNamePlaceholder(documentPathB);

  return `${expressionAttributeNamePlaceholderA} < ${expressionAttributeNamePlaceholderB}`;
}
