export function buildAttributeExistsStatement(documentPathPlaceholder: string) {
  return `attribute_exists(${documentPathPlaceholder})`;
}

export function buildAttributeIsOfTypeStatement(
  documentPathPlaceholder: string,
  attributeTypePlaceholder: string,
) {
  return `attribute_type(${documentPathPlaceholder}, ${attributeTypePlaceholder})`;
}
