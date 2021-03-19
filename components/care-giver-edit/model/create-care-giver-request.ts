import { WorkerWomanSmall } from '../../../constant';

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
    return new CreateCareGiverRequest('', true, 0, '', WorkerWomanSmall, '', '');
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
}
