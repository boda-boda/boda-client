import RecipientDetailNewView from '../../views/recipients-new-view';
import { withRouter } from 'next/router';

function RecipientDetailNewPage() {
  return <RecipientDetailNewView />;
}

export default withRouter(RecipientDetailNewPage);
