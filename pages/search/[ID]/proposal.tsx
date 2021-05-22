import { withRouter } from 'next/router';
import { usePrivatePage } from '../../../common/hooks/private-page';
import { useCareCenter } from '../../../context/care-center';
import MatchingProposalNewView from '../../../views/matching-proposal-new-view';

function MatchingProposalPage() {
  usePrivatePage(useCareCenter());

  return <MatchingProposalNewView />;
}

export default withRouter(MatchingProposalPage);
