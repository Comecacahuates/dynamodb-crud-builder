export function buildEqualToComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} = ${operandB}`;
}

export function buildNotEqualToComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} <> ${operandB}`;
}

export function buildLessThanComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} < ${operandB}`;
}

export function buildLessThanOrEqualToComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} <= ${operandB}`;
}

export function buildGreaterThanComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} > ${operandB}`;
}

export function buildGreaterThanOrEqualToComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} >= ${operandB}`;
}

export function buildBetweenComparisonStatement(
  operand: string,
  lowerBoundOperand: string,
  upperBoundOperand: string,
): string {
  return `${operand} BETWEEN ${lowerBoundOperand} AND ${upperBoundOperand}`;
}

export function buildInComparisonStatement(
  operand: string,
  list: string[],
): string {
  return `${operand} IN (${list.join(', ')})`;
}
