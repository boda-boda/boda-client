import OuterCareWorker from './outer-care-worker';
import Recipient from './recipient';

export default class MatchingProposal {
  public id: number;
  public hourlyWage: number;
  public description: string;
  public status: string;
  public securityCode: number;
  public outerCareWorker: OuterCareWorker;
  public recipient: Recipient;
}
