import RecipientDetail from '../../../views/recipients-detail-view';
import { withRouter } from 'next/router';

function RecipientDetailPage() {
  return <RecipientDetail />;
}

export default withRouter(RecipientDetailPage);
