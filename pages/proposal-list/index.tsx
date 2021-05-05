import { usePrivatePage } from '../../common/hooks/private-page';
import { useCareCenter } from '../../context/care-center';
import ProposalList from '../../views/proposal-list';

export default function ProposalListPage() {
  usePrivatePage(useCareCenter());
  return <ProposalList />;
}
