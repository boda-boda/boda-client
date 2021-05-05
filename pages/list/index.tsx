import { usePrivatePage } from '../../common/hooks/private-page';
import { useCareCenter } from '../../context/care-center';
import CareGiverListView from '../../views/care-giver-list-view';

export default function CareGiverListPage() {
  usePrivatePage(useCareCenter());
  return <CareGiverListView />;
}
