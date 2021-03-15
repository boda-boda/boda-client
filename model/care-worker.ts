import BusinessArea from './business-area';
import CareWorkerSchedule from './care-worker-schedule';
import CareWorkerCareer from './care-worker-career';
import CareWorkerMeta from './care-worker-meta';

export default class CareWorker {
  public address: string;
  public age: number;

  public careWorkerAreas: BusinessArea[];
  public careWorkerCareers: CareWorkerCareer[];
  public careWorkerMetas: CareWorkerMeta[];
  public careWorkerSchedules: CareWorkerSchedule[];

  public description: string;
  public gender: string;
  public id: string;
  public name: string;
  public phoneNumber: string;
  public profile: string;
}
