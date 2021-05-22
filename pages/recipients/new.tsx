import RecipientDetailNewView from '../../views/recipients-new-view';
import { withRouter } from 'next/router';
import { usePrivatePage } from '../../common/hooks/private-page';
import { useCareCenter } from '../../context/care-center';

function RecipientDetailNewPage() {
  usePrivatePage(useCareCenter());

  return <RecipientDetailNewView />;
}

export default withRouter(RecipientDetailNewPage);
