import { StringAttribute, DateAttribute } from '../attribute/index.js';

export abstract class Schema {
  public readonly entityName: StringAttribute;
  public readonly creationTime: DateAttribute = new DateAttribute(
    '_ct',
    new Date(),
  );
  public readonly updateTime: DateAttribute = new DateAttribute(
    '_ut',
    new Date(),
  );

  public constructor(entityName: string) {
    this.entityName = new StringAttribute('_et', entityName);
  }

  public get pk(): StringAttribute {
    return new StringAttribute('PK', this.getPkValue());
  }

  public abstract getPkValue(): string;

  public get sk(): StringAttribute {
    return new StringAttribute('SK', this.getSkValue());
  }

  public abstract getSkValue(): string;

  public get gsi1pk(): StringAttribute {
    return this.sk;
  }

  public get gsi1sk(): StringAttribute {
    return this.pk;
  }

  public get gsi2pk(): StringAttribute {
    return new StringAttribute('GSI2PK', this.getGsi2pkValue());
  }

  public abstract getGsi2pkValue(): string;

  public get gsi2sk(): StringAttribute {
    return new StringAttribute('GSI2SK', this.getGsi2skValue());
  }

  public abstract getGsi2skValue(): string;
}
