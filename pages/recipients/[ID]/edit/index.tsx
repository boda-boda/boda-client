import RecipientDetailEditView from '../../../../views/recipients-edit-view';
import { withRouter } from 'next/router';
import { useCareCenter } from '../../../../context/care-center';
import { usePrivatePage } from '../../../../common/hooks/private-page';

function RecipientDetailEditPage() {
  usePrivatePage(useCareCenter());

  return <RecipientDetailEditView />;
}

export default withRouter(RecipientDetailEditPage);
