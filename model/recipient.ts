import Meta from './care-worker-meta';
import { RecipientTime } from './recipient-time';

export default class Recipient {
  public zipCode: string;
  public address: string;
  public detailAddress: string;
  public age: number;
  public birthDay: string;
  public recipientMetas: Meta[];
  public description: string;
  public grade: number;
  public isFemale: boolean;
  public id: string;
  public name: string;
  public phoneNumber: string;
  public profile: string;
  public hourlyWage: number;
  public note: string;
  public familyType: string;
  public religion: string;
  public serviceTime: string;

  public recipientTime: RecipientTime[];
}
