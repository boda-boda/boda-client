import CareGiverNewView from '../views/care-giver-new-view';
import { withRouter } from 'next/router';
import { usePrivatePage } from '../common/hooks/private-page';
import { useCareCenter } from '../context/care-center';

function CareGiverNewPage() {
  usePrivatePage(useCareCenter());

  return <CareGiverNewView />;
}

export default withRouter(CareGiverNewPage);
