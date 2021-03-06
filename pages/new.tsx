import CareGiverNewView from '../views/care-giver-new-view';
import { withRouter } from 'next/router';

function CareGiverNewPage() {
  return <CareGiverNewView />;
}

export default withRouter(CareGiverNewPage);
