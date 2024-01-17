export function buildEqualsComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} = ${operandB}`;
}

export function buildNotEqualsComparisonStatement(
  operandA: string,
  operandB: string,
): string {
  return `${operandA} <> ${operandB}`;
}
