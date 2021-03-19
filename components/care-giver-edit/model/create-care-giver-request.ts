export default class CreateCareGiverRequest {
  public static allArgsConstructor(
    name: string,
    isFemale: boolean,
    birthDay: string,
    phoneNumber: string,
    profile: string,
    address: string,
    description: string
  ) {
    return new CreateCareGiverRequest(
      name,
      isFemale,
      birthDay,
      phoneNumber,
      profile,
      address,
      description
    );
  }

  public static noArgsConstructor() {
    return new CreateCareGiverRequest('', true, 0, '', '', '', '');
  }

  public constructor(
    name: any,
    isFemale: any,
    birthDay: any,
    phoneNumber: any,
    profile: any,
    address: any,
    description: any
  ) {
    this.name = name;
    this.isFemale = isFemale;
    this.birthDay = birthDay;
    this.phoneNumber = phoneNumber;
    this.profile = profile;
    this.address = address;
    this.description = description;
  }

  public name: string;
  public isFemale: boolean;
  public birthDay: string;
  public phoneNumber: string;
  public profile: string;
  public address: string;
  public description: string;

  public validate() {}

  private validateBirthDay() {
    if (this.birthDay.length !== 8) {
      return '생년월일에 8자리 숫자를 입력해주세요';
    }
    if (isNaN(parseInt(this.birthDay))) {
      return '생년월일에 숫자를 입력해 주세요.';
    }
  }
}
