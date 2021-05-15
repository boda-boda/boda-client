import { usePrivatePage } from '../../common/hooks/private-page';
import { useCareCenter } from '../../context/care-center';
import RecipientsList from '../../views/recipients-list';

export default function CareGiverListPage() {
  usePrivatePage(useCareCenter());
  return <RecipientsList />;
}
