export default class BusinessArea {
  public constructor() {
    this.city = null;
    this.gu = null;
    this.dong = null;
  }

  public city: string;
  public gu: string;
  public dong: string;

  public isValid() {
    return this.city && this.gu && this.dong;
  }
}
