export default class BusinessArea {
  public static noArgsConstructor() {
    return new BusinessArea(null, null, null);
  }

  public static allArgsConstructor(city: string, gu: string, dong: string) {
    return new BusinessArea(city, gu, dong);
  }

  public constructor(city: any, gu: any, dong: any) {
    this.city = city;
    this.gu = gu;
    this.dong = dong;
  }

  public city: string;
  public gu: string;
  public dong: string;

  public isValid() {
    return this.city && this.gu && this.dong;
  }
}
