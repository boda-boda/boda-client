import { usePrivatePage } from '../../../common/hooks/private-page';
import { useCareCenter } from '../../../context/care-center';
import CareGiverEditView from '../../../views/care-giver-edit-view';

export default function CareGiverEditPage() {
  usePrivatePage(useCareCenter());

  return <CareGiverEditView />;
}
