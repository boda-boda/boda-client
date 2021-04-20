import { withRouter } from 'next/router';
import MatchingProposalView from '../../../views/matching-proposal-view';

function MatchingProposalPage() {
  return <MatchingProposalView />;
}

export default withRouter(MatchingProposalPage);
