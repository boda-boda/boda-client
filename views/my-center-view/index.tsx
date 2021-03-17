import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import SlideLeftButtonSVG from '../../svgs/slide-left-button-svg';
import SlideRightButtonSVG from '../../svgs/slide-right-button-svg';
import { useState } from 'react';
import Link from 'next/link';
import { useCareCenter } from '../../context/care-center';
import Head from 'next/head';

export default function MyCenterView() {
  const { careCenter } = useCareCenter();

  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
      <Head>
        <title>돌봄: 나의 센터 정보</title>
      </Head>
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
                <Link href="mycenter/edit">
                  <S.EditButton>센터정보 수정</S.EditButton>
                </Link>
                <S.SectionTitle>센터 정보</S.SectionTitle>
                <S.Table>
                  <tbody>
                    <tr>
                      <td rowSpan={4} className="profile">
                        <S.ProfileImageContainer>
                          <S.ProfileImage src={careCenter?.profile} />
                        </S.ProfileImageContainer>
                      </td>
                      <th>이름</th>
                      <td className="infovalue">{careCenter?.username}</td>
                      <th>전화</th>
                      <td className="infovalue">{careCenter?.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td className="infovalue">{careCenter?.email}</td>
                      <th>홈페이지</th>
                      <td className="infovalue">{careCenter?.homePage}</td>
                    </tr>
                    <tr>
                      <th>위치</th>
                      <td colSpan={3}>
                        {careCenter?.address} {careCenter?.detailAddress}
                      </td>
                    </tr>
                    <tr>
                      <th>센터 소개</th>
                      <td colSpan={3}>{careCenter?.description}</td>
                    </tr>
                  </tbody>
                </S.Table>
              </S.Section>
              <S.Section>
                <S.SectionTitle>센터 이미지</S.SectionTitle>
                <S.CenterImageContainer>
                  <S.CenterImage src={careCenter?.careCenterMetas[imageIndex]?.value} />
                  <S.ButtonContainer>
                    <S.ButtonDiv
                      onClick={() =>
                        setImageIndex(
                          (imageIndex + careCenter?.careCenterMetas?.length - 1) %
                            careCenter?.careCenterMetas?.length
                        )
                      }
                    >
                      <SlideLeftButtonSVG />
                    </S.ButtonDiv>
                    <S.ButtonDiv
                      onClick={() =>
                        setImageIndex((imageIndex + 1) % careCenter?.careCenterMetas?.length)
                      }
                    >
                      <SlideRightButtonSVG />
                    </S.ButtonDiv>
                  </S.ButtonContainer>
                </S.CenterImageContainer>
              </S.Section>
            </S.MyCenterPage>
          </S.InnerContent>
        </>
      </Layout>
    </>
  );
}
