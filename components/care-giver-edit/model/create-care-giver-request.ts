export default class CreateCareGiverRequest {
  public static allArgsConstructor(
    name: string,
    isFemale: boolean,
    age: number,
    phoneNumber: string,
    profile: string,
    address: string,
    description: string
  ) {
    return new CreateCareGiverRequest(
      name,
      isFemale,
      age,
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
    age: any,
    phoneNumber: any,
    profile: any,
    address: any,
    description: any
  ) {
    this.name = name;
    this.isFemale = isFemale;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.profile = profile;
    this.address = address;
    this.description = description;
  }

  public name: string;
  public isFemale: boolean;
  public age: number;
  public phoneNumber: string;
  public profile: string;
  public address: string;
  public description: string;
}
