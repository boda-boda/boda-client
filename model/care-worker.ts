import BusinessArea from './business-area';
import CareWorkerCareer from './care-worker-career';
import Meta from './care-worker-meta';
import CareWorkerSingleSchedule from './care-worker-single-schedule';

export default class CareWorker {
  public zipCode: string;
  public address: string;
  public detailAddress: string;
  public age: number;
  public birthDay: string;
  public workingState: string;
  public licenseDate: string;
  public time: string;

  public careWorkerAreas: BusinessArea[];
  public careWorkerCareers: CareWorkerCareer[];
  public careWorkerMetas: Meta[];
  public careWorkerSchedules: CareWorkerSingleSchedule[];

  public description: string;
  public gender: string;
  public id: string;
  public name: string;
  public phoneNumber: string;
  public profile: string;
}
