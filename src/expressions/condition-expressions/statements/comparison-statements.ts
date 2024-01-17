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
