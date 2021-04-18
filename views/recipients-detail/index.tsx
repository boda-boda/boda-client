import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCareCenter } from '../../context/care-center';
import Category from '../../components/category';
import Banner from '../../components/banner';
import Layout from '../../components/layout';
import { BannerStyleType } from '../../common/types';
import Head from 'next/head';
import Reciepient from '../../model/reciepient';
import { CAPABILITY } from '../../constant';

export default function RecipientsDetail() {
  const router = useRouter();
  const careCenter = useCareCenter();
  const [recipient, setRecipient] = useState(new Reciepient());

  useEffect(() => {
    if (!router.query.ID || !careCenter || careCenter.isValidating || !careCenter.isLoggedIn) {
      return;
    }

    (async () => {
      try {
        //const response = await axios.get(`/recipients/${router.query.ID}`);
        //setRecipient(response.data);
        setRecipient({
          zipCode: '08018',
          address: '서울시 양천구 신정7동 목동남로4길 81',
          detailAddress: '105동 101호',
          age: 20,
          birthDay: '2000-08-21',

          recipientMetas: [{ type: CAPABILITY, key: '휠체어', value: '' }],

          description: '설명',
          grade: 3,
          gender: '여',
          id: 'asdf',
          name: '김슈급',
          phoneNumber: '010-7105-2344',
          profile: 'https://topclass.chosun.com/news_img/2008/2008_008_4.jpg',

          residenceType: '독거',
        });
      } catch (e) {
        router.push('/recipients');
      }
    })();
  }, [router.query.ID, careCenter]);

  const handleDeleteRecipient = useCallback(async () => {
    if (!window.confirm('해당 수급자를 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/recipients/${router.query.ID}`);
    } catch (e) {
      alert('서버 오류로 삭제에 실패하였습니다. 관리자에게 문의 부탁드립니다.');
      return;
    }

    alert('삭제에 성공하였습니다.');
    router.push('/recipients');
  }, [router.query.ID]);

  return (
    <>
      <Head>
        <title>돌봄: 수급자 세부정보</title>
      </Head>
      <Layout>
        <>
          <Banner
            bannerStyle={BannerStyleType.SECTION}
            sectionIndex={0}
            title="수급자 세부정보"
            subtitle="수급자의 자세한 정보를 확인할 수 있습니다."
          />
          <Category list={['홈', '나의 센터 정보', '수급자 관리', '수급자 세부정보']} />
          <S.CareGiverDetail>
            <S.InnerContent>
              <S.Section>
                <S.SectionTitle>수급자 정보</S.SectionTitle>
                <Link href={`${router.query.ID}/edit`} passHref>
                  <S.StyledLink>
                    <S.EditButton>세부정보 수정</S.EditButton>
                  </S.StyledLink>
                </Link>
                <S.DeleteButton onClick={handleDeleteRecipient}>수급자 삭제</S.DeleteButton>
                <S.Table>
                  <tbody>
                    <tr>
                      <td rowSpan={5} className="profile">
                        <S.ProfileImageContainer>
                          <S.ProfileImage src={recipient.profile} />
                        </S.ProfileImageContainer>
                      </td>
                      <th>이름</th>
                      <td className="infovalue">{recipient.name}</td>
                      <th>성별</th>
                      <td className="infovalue">{recipient.gender}</td>
                    </tr>
                    <tr>
                      <th>등급</th>
                      <td className="infovalue">{recipient.grade}등급</td>
                      <th>나이</th>
                      <td className="infovalue">{recipient.age}세</td>
                    </tr>
                    <tr>
                      <th>위치</th>
                      <td>
                        {recipient.address} {recipient.detailAddress}
                      </td>
                      <th>거주 형태</th>
                      <td>{recipient.residenceType}</td>
                    </tr>
                    <tr>
                      <th>가능 조건</th>
                      <td colSpan={3} className="personality">
                        <S.AvailabilityInfoList>
                          {recipient.careWorkerMetas &&
                            recipient.careWorkerMetas
                              .filter((meta) => meta.type === CAPABILITY)
                              .map((meta, i) => (
                                <S.AvailabilityInfoItem key={`${CAPABILITY}-${i}`}>
                                  {meta.key}
                                </S.AvailabilityInfoItem>
                              ))}
                        </S.AvailabilityInfoList>
                      </td>
                    </tr>
                    <tr>
                      <th>세부 사항</th>
                      <td colSpan={3}>{recipient.description}</td>
                    </tr>
                  </tbody>
                </S.Table>
              </S.Section>
              <S.Section>
                <S.SectionTitle>기타</S.SectionTitle>
                <S.Table>
                  <tr>
                    <th>시급</th>
                    <td>11,000원</td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td>
                      매번 요리 하실 필요는 없고, 있는 반찬으로 밥 차려드려서 식사만 도와드리면
                      됩니다. 산책하는 것을 좋아하셔서 날이 좋으면 자주 산책 해주시면 됩니다. 주로
                      혼자 생활하시며 자녀분께서 일주일에 두 번 정도 방문하십니다.
                    </td>
                  </tr>
                </S.Table>
              </S.Section>
            </S.InnerContent>
          </S.CareGiverDetail>
        </>
      </Layout>
    </>
  );
}
