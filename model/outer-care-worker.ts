import BusinessArea from './business-area';
import CareWorkerCareer from './care-worker-career';
import Meta from './care-worker-meta';
import CareWorkerSingleSchedule from './care-worker-single-schedule';

export default class OuterCareWorker {
  public zipCode: string;
  public address: string;
  public detailAddress: string;
  public age: number;
  public birthDay: string;
  public schedule: string;

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
