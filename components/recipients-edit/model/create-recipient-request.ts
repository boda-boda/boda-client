import { WORKER_WOMAN_SMALL_IMAGE_URL } from '../../../constant';

export default class CreateRecipientRequest {
  public static allArgsConstructor(
    name: string,
    isFemale: boolean,
    birthDay: string,
    grade: number,
    phoneNumber: string,
    profile: string,
    zipCode: string,
    address: string,
    detailAddress: string,
    description: string
  ) {
    return new CreateRecipientRequest(
      name,
      isFemale,
      birthDay,
      grade,
      phoneNumber,
      profile,
      zipCode,
      address,
      detailAddress,
      description
    );
  }

  public static noArgsConstructor() {
    return new CreateRecipientRequest(
      '',
      true,
      0,
      '',
      1,
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
    grade: any,
    phoneNumber: any,
    profile: string,
    zipCode: string,
    address: string,
    detailAddress: string,
    description: any
  ) {
    this.name = name;
    this.isFemale = isFemale;
    this.birthDay = birthDay;
    this.grade = grade;
    this.phoneNumber = phoneNumber;
    this.profile = profile;
    this.address = address;
    this.zipCode = zipCode;
    this.detailAddress = detailAddress;
    this.description = description;
  }

  public name: string;
  public isFemale: boolean;
  public birthDay: string;
  public grade: number;
  public phoneNumber: string;
  public profile: string;
  public zipCode: string;
  public address: string;
  public detailAddress: string;
  public description: string;
}
