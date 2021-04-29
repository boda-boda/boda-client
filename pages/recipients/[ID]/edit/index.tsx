import RecipientDetailEditView from '../../../../views/recipients-edit-view';
import { withRouter } from 'next/router';

function RecipientDetailEditPage() {
  return <RecipientDetailEditView />;
}

export default withRouter(RecipientDetailEditPage);
