import RecipientDetail from '../../../views/recipients-detail-view';
import { withRouter } from 'next/router';
import MatchingProposalDetail from '../../../components/matching-proposal-detail';
import MatchingProposalDetailView from '../../../views/matching-proposal-detail-view';

function RecipientDetailPage() {
  return <MatchingProposalDetailView />;
}

export default withRouter(RecipientDetailPage);
