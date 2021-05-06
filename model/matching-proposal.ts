import Meta from './care-worker-meta';
import { RecipientTime } from './recipient-time';

export default class MatchingProposal {
  public hourlyWage: number;
  public description: string;
  public outerCareWorkerId: string;
  public recipientId: string;
}
