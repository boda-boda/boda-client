import { WORKER_WOMAN_SMALL_IMAGE_URL } from '../../../constant';

export default class MatchingProposalDetailRequest {
  public static noArgsConstructor() {
    return new MatchingProposalDetailRequest('', '', '', {}, {}, 0);
  }

  public constructor(
    id: any,
    hourlyWage: any,
    description: any,
    recipient: any,
    outerCareWorker: any,
    securityCode: any
  ) {
    this.id = id;
    this.hourlyWage = hourlyWage;
    this.description = description;
    this.recipient = recipient;
    this.outerCareWorker = outerCareWorker;
    this.securityCode = securityCode;
  }

  public id: string;
  public hourlyWage: string;
  public description: string;
  public recipient: any;
  public outerCareWorker: any;
  public securityCode: any;
}
