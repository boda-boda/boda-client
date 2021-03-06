import CareGiverDetailView from '../../../views/care-giver-detail-view';
import { withRouter } from 'next/router';

function CareGiverDetailPage() {
  return <CareGiverDetailView />;
}

export default withRouter(CareGiverDetailPage);
