import { WORKER_WOMAN_SMALL_IMAGE_URL } from '../../../constant';

export default class CreateMatchingProposalRequest {
  public constructor() {
    this.hourlyWage = null;
    this.description = '';
    this.outerCareWorkerId = '';
    this.recipientId = '';
  }

  public hourlyWage: number;
  public description: string;
  public outerCareWorkerId: string;
  public recipientId: string;
}
