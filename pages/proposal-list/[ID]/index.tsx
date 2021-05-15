import { withRouter } from 'next/router';
import MatchingProposalDetailView from '../../../views/matching-proposal-detail-view';
import { usePrivatePage } from '../../../common/hooks/private-page';
import { useCareCenter } from '../../../context/care-center';

function RecipientDetailPage() {
  usePrivatePage(useCareCenter());
  return <MatchingProposalDetailView />;
}

export default withRouter(RecipientDetailPage);
