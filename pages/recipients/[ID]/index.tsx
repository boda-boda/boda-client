import RecipientDetail from '../../../views/recipients-detail-view';
import { withRouter } from 'next/router';

import { useCareCenter } from '../../../context/care-center';
import { usePrivatePage } from '../../../common/hooks/private-page';

function RecipientDetailPage() {
  usePrivatePage(useCareCenter());
  return <RecipientDetail />;
}

export default withRouter(RecipientDetailPage);
