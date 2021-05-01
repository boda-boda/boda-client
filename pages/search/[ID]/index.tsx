import OuterCareGiverDetailView from '../../../views/outer-care-giver-detail-view';
import { withRouter } from 'next/router';

function CareGiverDetailPage() {
  return <OuterCareGiverDetailView />;
}

export default withRouter(CareGiverDetailPage);
