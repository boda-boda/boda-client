import { withRouter } from 'next/router';
import MatchingProposalReceiveView from '../../../views/matching-proposal-receive-view';

function MatchingProposalReceivePage() {
  return <MatchingProposalReceiveView />;
}
export default withRouter(MatchingProposalReceivePage);
