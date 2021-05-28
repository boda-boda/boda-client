import React, { useCallback, useEffect, useRef, useState } from 'react';
import CareWorker from '../../model/care-worker';
import * as S from './styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import { chunk } from '../../common/lib';
import { CAPABILITY, CREDITS_ON_CONVERSION, DAY_LIST, RELIGION } from '../../constant';
import { DayType } from '../../common/types/date';
import Link from 'next/link';
import { useCareCenter } from '../../context/care-center';
import { validateCareWorker } from '../../common/lib/validate';
import Credit from '../../model/credit';

const dummyCompliment = [
  {
    title: '강 선생님을 칭찬합니다.',
    date: new Date(),
    centerID: '64aefb6c-a59a-4432-b9a0-d5f29ed2d653',
    centerName: '돌봄',
    content: `한 번도 지각한 적이 없으실 정도로 시간 약속을 잘 지키십니다.<br />
    맡으셨던 두 명의 수급자 분 모두 기본적으로 만족도가 높았고 특히 치매인지재활 부분에 대해서 상당히 만족하셨습니다.`,
  },
  {
    title: '상대방을 편안하게 해주시는 강 선생님',
    date: new Date(),
    centerID: 'asdf',
    centerName: '서울시 서대문구 재가센터',
    content: `강 선생님은 대화하는 상대방을 편하게 해주십니다.<br />
    실제로 맡으셨던 수급자와 보호자 분들께서 까다로우신 편이셔서 여러번 선생님 교체를 원하셨었는데, 강 선생님은 상당히 좋아하셨습니다.
    그래서 강 선생님께서 그 수급자 분과 1년 정도 꾸준히 하셨습니다.<br />
      `,
  },
];

export default function OuterCareGiverDetail() {
  const router = useRouter();
  const careCenter = useCareCenter();
  const [outerCareWorker, setOuterCareWorker] = useState({} as any);
  const [isEditingCompliment, setIsEditingCompliment] = useState(false);
  const [myCompliment, setMyCompliment] = useState(null);
  const [myComplimentTitle, setMyComplimentTitle] = useState('');
  const [myComplimentContent, setMyComplimentContent] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [convertedOuterCareWorkerIds, setConvertedOuterCareWorkerIds] = useState([] as string[]);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current!.style.height = 'auto';
    contentRef.current!.style.height = (contentRef.current!.scrollHeight + 10).toString() + 'px';
  }, [myComplimentContent]);

  useEffect(() => {
    if (!careCenter.careCenter) return;
    setMyCompliment(
      dummyCompliment.find((compliment) => compliment.centerID === careCenter.careCenter.id) || null
    );
  });

  useEffect(() => {
    if (!myCompliment) return;
    setMyComplimentTitle(myCompliment.title);
    setMyComplimentContent(myCompliment.content);
  }, [myCompliment]);

  useEffect(() => {
    if (!router.query.ID || !careCenter || careCenter.isValidating || !careCenter.isLoggedIn) {
      return;
    }

    (async () => {
      try {
        const response = await axios.get(`/outer-care-worker/${router.query.ID}`);
        setOuterCareWorker(response.data);
        const ocwIdResponse = await axios.get(`/outer-care-worker/id/converted`);
        setConvertedOuterCareWorkerIds(ocwIdResponse.data);
      } catch (e) {
        router.push('/search');
      }
    })();
  }, [router.query.ID, careCenter]);

  const handleEditCompliment = () => {
    setIsEditingCompliment(true);
  };

  const handleApplyCompliment = () => {
    setIsEditingCompliment(false);
    //update 칭찬
  };

  const handleClickConversionButton = async () => {
    if (
      !window.confirm(
        `${CREDITS_ON_CONVERSION} 돌봄 포인트를 사용하여 내 요양보호사로 전환하시겠습니까?`
      )
    )
      return;

    try {
      const response = await axios.get(`/outer-care-worker/conversion/${router.query.ID}`);
      const creditResponse = await axios.get(`/credit`);
      const credit = creditResponse.data as Credit;
      if (credit.freeCredit + credit.paidCredit <= CREDITS_ON_CONVERSION) {
        alert('보유하신 돌봄 포인트가 부족합니다.');
        return;
      }
      try {
        await axios.post('/outer-care-worker/conversion', {
          outerCareWorkerId: outerCareWorker.id,
        });
      } catch (e) {
        alert('이미 전환된 요양보호사 입니다.');
        return;
      }
      try {
        await axios.put(`credit/use`, {
          usedCredit: CREDITS_ON_CONVERSION,
          careWorkerName: response.data.careWorker.name,
        });
        await axios.post('/care-worker', {
          careWorker: response.data.careWorker,
          careWorkerAreas: response.data.careWorkerAreas,
          careWorkerCapabilities: response.data.careWorkerCapabilities,
          careWorkerCareers: response.data.careWorkerCareers,
          careWorkerReligions: response.data.careWorkerReligions,
        });
      } catch (e) {
        alert(
          '요양보호사 전환에 실패하였습니다. 관리자에게 문의 주시면 신속하게 도와드리겠습니다.'
        );
        return;
      }
    } catch (e) {
      alert(
        '해당 요양보호사 전환에 실패하였습니다. 관리자에게 문의 주시면 신속하게 도와드리겠습니다.'
      );
      router.push('/search');
    }

    alert('요양보호사 전환에 성공하였습니다.');
  };

  return (
    <>
      <S.CareGiverDetail>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            {convertedOuterCareWorkerIds.includes(outerCareWorker.id) && (
              <S.ConvertedInfo>(이미 전환된 요양보호사 입니다.)</S.ConvertedInfo>
            )}
            <S.Table>
              <tbody>
                <tr>
                  <td rowSpan={4} className="profile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src={outerCareWorker.profile} />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="infovalue">{outerCareWorker.name}</td>
                  <th>성별</th>
                  <td className="infovalue">{outerCareWorker.gender}</td>
                </tr>
                <tr>
                  <th>생년월일</th>
                  <td className="infovalue">
                    {outerCareWorker.birthDay && outerCareWorker.age
                      ? `${outerCareWorker.birthDay} (${outerCareWorker.age}세)`
                      : ''}
                  </td>
                  <th>휴대전화</th>
                  <td className="infovalue">{outerCareWorker.phoneNumber}</td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td className="infovalue">
                    {outerCareWorker.schedule ? outerCareWorker.schedule : ''}
                  </td>
                  <th>종교</th>
                  <td>{outerCareWorker.religion ? outerCareWorker.religion : ''}</td>
                </tr>
                <tr>
                  <th className="twoRow">
                    자격증
                    <br />
                    취득일
                  </th>
                  <td className="infovalue" colSpan={3}>
                    {outerCareWorker.licenseDate ? outerCareWorker.licenseDate : ''}
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>메모</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td className="memo">{outerCareWorker.description}</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>활동 지역</S.SectionTitle>
            <S.Table>
              <tbody>
                {outerCareWorker.outerCareWorkerAreas ? (
                  outerCareWorker.outerCareWorkerAreas?.length > 0 ? (
                    chunk(outerCareWorker.outerCareWorkerAreas, 3).map((row, key) => {
                      return (
                        <tr key={`${key}`}>
                          {row.map((areaItem, areaItemIndex) => {
                            return (
                              <td
                                className={
                                  key === 0
                                    ? `area ${areaItemIndex === row.length - 1 && 'right'}`
                                    : `area ${(areaItemIndex + 1) % 3 === 0 && 'right'}`
                                }
                                key={`areaItem-${areaItemIndex}`}
                              >
                                {areaItem.city} {areaItem.gu} {areaItem.dong}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>등록된 활동 지역이 없습니다.</td>
                    </tr>
                  )
                ) : (
                  ''
                )}
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>가능 조건</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td className="personality">
                    <S.AvailabilityInfoList>
                      {outerCareWorker.outerCareWorkerMetas
                        ? outerCareWorker.outerCareWorkerMetas?.map((meta, i) => (
                            <S.AvailabilityInfoItem key={`${CAPABILITY}-${i}`}>
                              {meta.key}
                            </S.AvailabilityInfoItem>
                          ))
                        : '가능 조건 정보가 없습니다'}
                    </S.AvailabilityInfoList>
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>경력</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <th className="career long">근무지</th>
                  <th className="career">수급자</th>
                  <th className="career right">기간</th>
                </tr>
                {outerCareWorker.outerCareWorkerCareers ? (
                  outerCareWorker.outerCareWorkerCareers.length > 0 ? (
                    outerCareWorker.outerCareWorkerCareers.map((career, idx) => (
                      <tr key={`career-${idx}`}>
                        <td className="career long">{career.workplace}</td>
                        <td className="career">{career.recipient}</td>
                        <td className="career right">{career.duration}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="career long"></td>
                      <td className="career"></td>
                      <td className="career right"></td>
                    </tr>
                  )
                ) : (
                  ''
                )}
              </tbody>
            </S.Table>
          </S.Section>
          {/* <S.Section>
            <S.SectionTitle>칭찬</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td style={{ background: '#f4f4f4', position: 'relative' }}>
                    {isEditingCompliment ? (
                      <>
                        <S.ComplimentTitleInput
                          type="text"
                          placeholder="칭찬 제목"
                          value={myComplimentTitle || ''}
                          onChange={(e) => setMyComplimentTitle(e.target.value)}
                        />
                        <S.ComplimentContentInput
                          ref={contentRef}
                          placeholder="칭찬 내용"
                          value={myComplimentContent || ''}
                          onChange={(e) => setMyComplimentContent(e.target.value)}
                        />
                        <S.ComplimentApplyButton onClick={handleApplyCompliment}>
                          저장하기
                        </S.ComplimentApplyButton>
                      </>
                    ) : myCompliment ? (
                      <>
                        <S.ComplimentEditButton onClick={handleEditCompliment}>
                          수정하기
                        </S.ComplimentEditButton>
                        <S.ComplimentTitle>{myCompliment.title}</S.ComplimentTitle>
                        <S.ComplimentDate>
                          {myCompliment.date.toDateString()} · {careCenter.careCenter.username}
                        </S.ComplimentDate>
                        <S.ComplimentContent
                          dangerouslySetInnerHTML={{ __html: myCompliment.content }}
                        ></S.ComplimentContent>
                      </>
                    ) : (
                      <>
                        <S.ComplimentEditButton onClick={handleEditCompliment}>
                          작성하기
                        </S.ComplimentEditButton>
                        아직 작성한 칭찬이 없습니다.
                        <br />
                        요양보호사를 칭찬해보세요!
                      </>
                    )}
                  </td>
                </tr>
                {dummyCompliment.map((compliment, index) => {
                  return (
                    <tr key={`compliment-${index}`}>
                      <td>
                        <S.ComplimentTitle>{compliment.title}</S.ComplimentTitle>
                        <S.ComplimentDate>
                          {compliment.date.toDateString()} · {compliment.centerName}
                        </S.ComplimentDate>
                        <S.ComplimentContent
                          dangerouslySetInnerHTML={{ __html: compliment.content }}
                        ></S.ComplimentContent>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </S.Table>
          </S.Section> */}
          <S.FinishButtonContainer>
            <S.TransferButton onClick={handleClickConversionButton}>
              내 요양보호사로 전환하기
            </S.TransferButton>
            <Link
              key={`worker-${outerCareWorker.id}`}
              href={{
                pathname: '/search/[id]/proposal',
              }}
              as={`/search/${outerCareWorker.id}/proposal`}
              passHref
            >
              <S.FinishButton>매칭 제안서 작성하기</S.FinishButton>
            </Link>
          </S.FinishButtonContainer>
        </S.InnerContent>
      </S.CareGiverDetail>
    </>
  );
}
