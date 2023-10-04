export abstract class Schema {
  private internalCreationTime = new Date();
  private internalUpdateTime = new Date();

  public constructor() {}

  public abstract get entityName(): string;

  public get creationTime(): Date {
    return this.internalCreationTime;
  }

  public get updateTime(): Date {
    return this.internalUpdateTime;
  }

  public abstract get pk(): string;
  public abstract get sk(): string;
  public get gsi1pk(): string {
    return this.sk;
  }
  public get gsi1sk(): string {
    return this.pk;
  }
  public abstract get gsi2pk(): string;
  public abstract get gsi2sk(): string;
}
