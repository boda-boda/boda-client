import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import MatchingProposalRecieve from '../../components/matching-proposal-recieve';

export default function MatchingProposalRecieveView() {
  return (
    <Layout>
      <>
        <Banner
          bannerStyle={BannerStyleType.SECTION}
          sectionIndex={1}
          title="매칭 제안서 확인"
          subtitle="안녕하세요 선생님, 돌봄입니다.#매칭 제안서를 확인하신 후 근무를 희망하시면 수락버튼을 눌러주세요."
        />
        <S.MatchingProposalPage>
          <MatchingProposalRecieve isFilled={false} />
        </S.MatchingProposalPage>
      </>
    </Layout>
  );
}
