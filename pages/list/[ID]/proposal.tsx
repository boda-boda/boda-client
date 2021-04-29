import { withRouter } from 'next/router';
import MatchingProposalNewView from '../../../views/matching-proposal-new-view';

function MatchingProposalPage() {
  return <MatchingProposalNewView />;
}

export default withRouter(MatchingProposalPage);
