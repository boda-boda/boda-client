import { withRouter } from 'next/router';
import MatchingProposalDetailView from '../../../views/matching-proposal-detail-view';

function RecipientDetailPage() {
  return <MatchingProposalDetailView />;
}

export default withRouter(RecipientDetailPage);
