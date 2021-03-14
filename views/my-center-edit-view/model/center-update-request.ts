import { CareCenterMeta } from '../../../model/care-center';

export default class CenterUpdateRequest {
  public constructor(careCenter: CareCenterMeta) {
    this.username = careCenter?.username ? careCenter.username : '';
    this.email = careCenter?.email ? careCenter.email : '';
    this.phoneNumber = careCenter?.phoneNumber ? careCenter.phoneNumber : '';
    this.homePage = careCenter?.homePage ? careCenter.homePage : '';
    this.zipCode = careCenter?.zipCode ? careCenter.zipCode : '';
    this.address = careCenter?.address ? careCenter.address : '';
    this.detailAddress = careCenter?.detailAddress ? careCenter.detailAddress : '';
    this.description = careCenter?.description ? careCenter.description : '';
    this.profile = careCenter?.profile ? careCenter.profile : '';
  }

  public username: string;
  public email: string;
  public phoneNumber: string;
  public profile: string;
  public homePage: string;
  public zipCode: string;
  public address: string;
  public detailAddress: string;
  public description: string;
}
