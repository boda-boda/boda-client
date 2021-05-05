import OuterCareGiverDetailView from '../../../views/outer-care-giver-detail-view';
import { withRouter } from 'next/router';
import { usePrivatePage } from '../../../common/hooks/private-page';
import { useCareCenter } from '../../../context/care-center';

function CareGiverDetailPage() {
  usePrivatePage(useCareCenter());

  return <OuterCareGiverDetailView />;
}

export default withRouter(CareGiverDetailPage);
