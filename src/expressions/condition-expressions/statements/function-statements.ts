export function buildAttributeExistsFunctionStatement(
  documentPathPlaceholder: string,
) {
  return `attribute_exists(${documentPathPlaceholder})`;
}

export function buildAttributeNotExistsFunctionStatement(
  documentPathPlaceholder: string,
) {
  return `attribute_not_exists(${documentPathPlaceholder})`;
}

export function buildAttributeTypeFunctionStatement(
  documentPathPlaceholder: string,
  operand: string,
) {
  return `attribute_type(${documentPathPlaceholder}, ${operand})`;
}

export function buildBeginsWithFunctionStatement(
  documentPathPlaceholder: string,
  operand: string,
) {
  return `begins_with(${documentPathPlaceholder}, ${operand})`;
}

export function buildContainsFunctionStatement(
  documentPathPlaceholder: string,
  operand: string,
) {
  return `contains(${documentPathPlaceholder}, ${operand})`;
}

export function buildSizeFunctionStatement(documentPathPlaceholder: string) {
  return `size(${documentPathPlaceholder})`;
}
