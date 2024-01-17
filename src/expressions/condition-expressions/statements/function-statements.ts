export function buildAttributeExistsStatement(operand: string) {
  return `attribute_exists(${operand})`;
}
