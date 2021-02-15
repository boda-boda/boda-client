import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import SlideLeftButtonSVG from '../../svgs/slide-left-button-svg';
import SlideRightButtonSVG from '../../svgs/slide-right-button-svg';
import { useState } from 'react';

export default function MyCenterView() {
  const centerImage = [
    'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg',
    'https://icatcare.org/app/uploads/2018/06/Layer-1704-1200x630.jpg',
    'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg',
  ];
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <Layout>
      <>
        <Banner
          bannerStyle={BannerStyleType.SECTION}
          sectionIndex={2}
          title="나의 센터 정보"
          subtitle="우리 센터 정보를 등록할 수 있습니다."
        />
        <Category list={['홈', '나의 센터 정보']} />
        <S.InnerContent>
          <S.MyCenterPage>
            <S.Section>
              <S.SectionTitle>센터 정보</S.SectionTitle>
              <S.Table>
                <tbody>
                  <tr>
                    <td rowSpan={4} className="profile">
                      <S.ProfileImageContainer>
                        <S.ProfileImage src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg" />
                      </S.ProfileImageContainer>
                    </td>
                    <th>이름</th>
                    <td>보다 재가센터</td>
                    <th>위치</th>
                    <td>서대문구 통일로 123</td>
                  </tr>
                  <tr>
                    <th>전화</th>
                    <td>02-000-0000</td>
                    <th>홈페이지</th>
                    <td>www.boda.kr</td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>02-000-0000</td>
                    <th>이메일</th>
                    <td>bodacenter@boda.kr</td>
                  </tr>
                  <tr>
                    <th>센터 소개</th>
                    <td colSpan={3}>센터 소개글이 표시됩니다.</td>
                  </tr>
                </tbody>
              </S.Table>
            </S.Section>
            <S.Section>
              <S.SectionTitle>센터 이미지</S.SectionTitle>
              <S.CenterImageContainer>
                <S.CenterImage src={centerImage[imageIndex]} />
                <S.ButtonContainer>
                  <S.ButtonDiv
                    onClick={() =>
                      setImageIndex((imageIndex + centerImage.length - 1) % centerImage.length)
                    }
                  >
                    <SlideLeftButtonSVG />
                  </S.ButtonDiv>
                  <S.ButtonDiv onClick={() => setImageIndex((imageIndex + 1) % centerImage.length)}>
                    <SlideRightButtonSVG />
                  </S.ButtonDiv>
                </S.ButtonContainer>
              </S.CenterImageContainer>
            </S.Section>
          </S.MyCenterPage>
        </S.InnerContent>
      </>
    </Layout>
  );
}
