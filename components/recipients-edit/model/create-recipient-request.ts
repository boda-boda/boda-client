import { WORKER_WOMAN_SMALL_IMAGE_URL } from '../../../constant';

export default class CreateRecipientRequest {
  public static allArgsConstructor(
    name: string,
    isFemale: boolean,
    age: number,
    grade: number,
    phoneNumber: string,
    profile: string,
    zipCode: string,
    address: string,
    detailAddress: string,
    description: string,
    note: string,
    hourlyWage: number,
    familyType: string,
    reilgion: string,
    schedule: string
  ) {
    return new CreateRecipientRequest(
      name,
      isFemale,
      age,
      grade,
      phoneNumber,
      profile,
      zipCode,
      address,
      detailAddress,
      description,
      note,
      hourlyWage,
      familyType,
      reilgion,
      schedule
    );
  }

  public static noArgsConstructor() {
    return new CreateRecipientRequest(
      '',
      false,
      0,
      1,
      '',
      WORKER_WOMAN_SMALL_IMAGE_URL,
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      '',
      ''
    );
  }

  public constructor(
    name: any,
    isFemale: any,
    age: any,
    grade: any,
    phoneNumber: any,
    profile: string,
    zipCode: string,
    address: string,
    detailAddress: string,
    description: any,
    note: string,
    hourlyWage: number,
    familyType: string,
    religion: string,
    schedule: string
  ) {
    this.name = name;
    this.isFemale = isFemale;
    this.age = age;
    this.grade = grade;
    this.phoneNumber = phoneNumber;
    this.profile = profile;
    this.address = address;
    this.zipCode = zipCode;
    this.detailAddress = detailAddress;
    this.description = description;
    this.note = note;
    this.hourlyWage = hourlyWage;
    this.familyType = familyType;
    this.religion = religion;
    this.schedule = schedule;
  }

  public name: string;
  public isFemale: boolean;
  public age: number;
  public grade: number;
  public phoneNumber: string;
  public profile: string;
  public zipCode: string;
  public address: string;
  public detailAddress: string;
  public description: string;
  public hourlyWage: number;
  public note: string;
  public familyType: string;
  public religion: string;
  public schedule: string;
}
