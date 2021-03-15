import BusinessArea from './business-area';
import CareWorkerCareer from './care-worker-career';
import CareWorkerMeta from './care-worker-meta';
import CareWorkerSingleSchedule from './care-worker-single-schedule';

export default class CareWorker {
  public address: string;
  public age: number;

  public careWorkerAreas: BusinessArea[];
  public careWorkerCareers: CareWorkerCareer[];
  public careWorkerMetas: CareWorkerMeta[];
  public careWorkerSchedules: CareWorkerSingleSchedule[];

  public description: string;
  public gender: string;
  public id: string;
  public name: string;
  public phoneNumber: string;
  public profile: string;
}
