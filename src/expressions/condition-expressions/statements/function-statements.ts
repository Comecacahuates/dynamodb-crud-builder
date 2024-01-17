export function buildAttributeExistsStatement(documentPathPlaceholder: string) {
  return `attribute_exists(${documentPathPlaceholder})`;
}

export function buildAttributeNotExistsStatement(
  documentPathPlaceholder: string,
) {
  return `attribute_not_exists(${documentPathPlaceholder})`;
}

export function buildAttributeIsOfTypeStatement(
  documentPathPlaceholder: string,
  attributeTypePlaceholder: string,
) {
  return `attribute_type(${documentPathPlaceholder}, ${attributeTypePlaceholder})`;
}

export function buildBeginsWithStatement(
  documentPathPlaceholder: string,
  operandPlaceholder: string,
) {
  return `begins_with(${documentPathPlaceholder}, ${operandPlaceholder})`;
}

export function buildContainsStatement(
  documentPathPlaceholder: string,
  operandPlaceholder: string,
) {
  return `contains(${documentPathPlaceholder}, ${operandPlaceholder})`;
}
