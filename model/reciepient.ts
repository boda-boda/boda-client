import CareWorkerMeta from './care-worker-meta';

export default class Reciepient {
  public zipCode: string;
  public address: string;
  public detailAddress: string;
  public age: number;
  public birthDay: string;

  public careWorkerMetas: CareWorkerMeta[];

  public description: string;
  public grade: number;
  public gender: string;
  public id: string;
  public name: string;
  public phoneNumber: string;
  public profile: string;
}
