import { withRouter } from 'next/router';
import CareGiverDetailViewDemo from '../../../views/care-giver-detail-view-demo';

function CareGiverDetailDemoPage() {
  return <CareGiverDetailViewDemo />;
}

export default withRouter(CareGiverDetailDemoPage);
