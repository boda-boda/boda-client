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
import Recipient from '../../model/recipient';
import { CAPABILITY } from '../../constant';

export default function RecipientsDetail() {
  const router = useRouter();
  const careCenter = useCareCenter();
  const [recipient, setRecipient] = useState(new Recipient());

  useEffect(() => {
    if (!router.query.ID || !careCenter || careCenter.isValidating || !careCenter.isLoggedIn) {
      return;
    }

    (async () => {
      try {
        const response = await axios.get(`/recipient/${router.query.ID}`);
        setRecipient(response.data);
      } catch (e) {
        router.push('/recipients');
      }
    })();
  }, [router.query.ID, careCenter]);

  const handleDeleteRecipient = useCallback(async () => {
    if (!window.confirm('해당 수급자를 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/recipient/${router.query.ID}`);
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
          <Category list={['홈', '나의 센터 관리', '수급자 관리', '수급자 세부정보']} />
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
                      <td className="infovalue">{recipient.isFemale ? '여' : '남'}</td>
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
                      <td>{recipient.familyType}</td>
                    </tr>
                    <tr>
                      <th>가능 조건</th>
                      <td colSpan={3} className="personality">
                        <S.AvailabilityInfoList>
                          {recipient.recipientMetas &&
                            recipient.recipientMetas
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
                    <td>{recipient.hourlyWage}</td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td>{recipient.note}</td>
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
