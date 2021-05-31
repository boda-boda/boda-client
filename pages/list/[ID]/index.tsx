import CareGiverDetailView from '../../../views/care-giver-detail-view';
import { withRouter } from 'next/router';
import { usePrivatePage } from '../../../common/hooks/private-page';
import { useCareCenter } from '../../../context/care-center';

function CareGiverDetailPage() {
  usePrivatePage(useCareCenter());
  return <CareGiverDetailView />;
}

export default withRouter(CareGiverDetailPage);
