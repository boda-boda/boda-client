import { WORKER_WOMAN_SMALL_IMAGE_URL } from '../../../constant';

export default class MatchingProposalDetailRequest {
  public static noArgsConstructor() {
    return new MatchingProposalDetailRequest('', '', '', {}, {});
  }

  public constructor(
    id: any,
    hourlyWage: any,
    description: any,
    recipient: any,
    outerCareWorker: any
  ) {
    this.id = id;
    this.hourlyWage = hourlyWage;
    this.description = description;
    this.recipient = recipient;
    this.outerCareWorker = outerCareWorker;
  }

  public id: string;
  public hourlyWage: string;
  public description: string;
  public recipient: any;
  public outerCareWorker: any;
}
