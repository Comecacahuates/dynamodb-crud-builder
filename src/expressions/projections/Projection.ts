import { type Expression } from '../Expression.js';
import { AttributeNames, AttributeValues } from '../attributes/index.js';
import {
  type DocumentPaths,
  type DocumentPath,
} from '../operands/DocumentPath.js';

export class Projection implements Expression {
  private attributeNames = new AttributeNames();
  private attributeValues = new AttributeValues();
  private documentPaths: DocumentPaths = [];

  public constructor() {}

  public add(documentPath: DocumentPath): Projection {
    this.documentPaths.push(documentPath);
    this.attributeNames.merge(documentPath.getAttributeNames());
    return this;
  }

  getString(): string {
    return this.documentPaths
      .map((eachDocumentPath) => eachDocumentPath.getString())
      .join(', ');
  }

  public getAttributeNames(): AttributeNames {
    return this.attributeNames;
  }

  public getAttributeValues(): AttributeValues {
    return this.attributeValues;
  }
}
