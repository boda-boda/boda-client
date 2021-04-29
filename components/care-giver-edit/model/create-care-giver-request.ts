import { WORKER_WOMAN_SMALL_IMAGE_URL } from '../../../constant';

export default class CreateCareGiverRequest {
  public static allArgsConstructor(
    name: string,
    isFemale: boolean,
    birthDay: string,
    phoneNumber: string,
    workingState: string,
    licenseDate: string,
    profile: string,
    zipCode: string,
    address: string,
    detailAddress: string,
    description: string
  ) {
    return new CreateCareGiverRequest(
      name,
      isFemale,
      birthDay,
      phoneNumber,
      workingState,
      licenseDate,
      profile,
      zipCode,
      address,
      detailAddress,
      description
    );
  }

  public static noArgsConstructor() {
    return new CreateCareGiverRequest(
      '',
      true,
      0,
      '',
      '',
      '',
      WORKER_WOMAN_SMALL_IMAGE_URL,
      '',
      '',
      '',
      ''
    );
  }

  public constructor(
    name: any,
    isFemale: any,
    birthDay: any,
    phoneNumber: any,
    workingState: any,
    licenseDate: any,
    profile: string,
    zipCode: string,
    address: string,
    detailAddress: string,
    description: any
  ) {
    this.name = name;
    this.isFemale = isFemale;
    this.birthDay = birthDay;
    this.phoneNumber = phoneNumber;
    this.workingState = workingState;
    this.licenseDate = licenseDate;
    this.profile = profile;
    this.address = address;
    this.zipCode = zipCode;
    this.detailAddress = detailAddress;
    this.description = description;
  }

  public name: string;
  public isFemale: boolean;
  public birthDay: string;
  public phoneNumber: string;
  public workingState: string;
  public licenseDate: string;
  public profile: string;
  public zipCode: string;
  public address: string;
  public detailAddress: string;
  public description: string;
}
