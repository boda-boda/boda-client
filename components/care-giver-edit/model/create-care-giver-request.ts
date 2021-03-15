export default class CreateCareGiverRequest {
  public constructor() {
    this.name = '';
    this.isFemale = true;
    this.age = 0;
    this.phoneNumber = '';
    this.profile = '';
    this.address = '';
    this.description = '';
  }

  public name: string;
  public isFemale: boolean;
  public age: number;
  public phoneNumber: string;
  public profile: string;
  public address: string;
  public description: string;
}
