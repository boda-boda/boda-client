import React, { useCallback, useEffect, useRef, useState } from 'react';
import CareWorker from '../../model/care-worker';
import * as S from './styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import { chunk } from '../../common/lib';
import { CAPABILITY, DAY_LIST, RELIGION } from '../../constant';
import { DayType } from '../../common/types/date';
import Link from 'next/link';
import { useCareCenter } from '../../context/care-center';

const dummyCompliment = [
  {
    title: '오태식씨를 칭찬합니다',
    date: new Date(),
    centerID: '64aefb6c-a59a-4432-b9a0-d5f29ed2d653',
    centerName: '돌봄',
    content:
      '병진이형 나가있으라고 말했잖아 내가 별 수 없게 현실이었어 감수하고 12, 000원 빼가 정준하 벌스라도 훔쳐갈 애가 명절 때 대입 자금 활짝 웃어 멀쩡합니다 베이식 형처럼 할거 매일 시켜 먹었다이가 외식을 치즈 콰트로 피어싱도 뚫어',
  },
  {
    title: '최고의 전문가 오태식',
    date: new Date(),
    centerID: 'asdf',
    centerName: '서울시 성북구 래원센터',
    content: `해바라기 식당에 바로 앞에 직장 에어팟 한 개에 집착 왜 발악해 신참<br />
      새파랗게 어린 자식들 거의 다 배신자 코펜하겐 수입 담배 가루 워싱턴<br />
      난 신짜오야 진짜 우황청심환 심장 만신창이와 술 취한 마술사의 아구창<br />
      삼지창은 간지 쫙 수강신청 언제적 산신령 먼 친척이 사실 여보 친정`,
  },
];

export default function CareGiveDetail() {
  const router = useRouter();
  const careCenter = useCareCenter();
  const [careWorker, setCareWorker] = useState(new CareWorker());
  const [isEditingCompliment, setIsEditingCompliment] = useState(false);
  const [myCompliment, setMyCompliment] = useState(null);
  const [myComplimentTitle, setMyComplimentTitle] = useState('');
  const [myComplimentContent, setMyComplimentContent] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

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
        const response = await axios.get(`/care-worker/${router.query.ID}`);
        setCareWorker(response.data);
      } catch (e) {
        router.push('/list');
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

  const handleDeleteCareWorker = useCallback(async () => {
    if (!window.confirm('해당 요양보호사를 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/care-worker/${router.query.ID}`);
    } catch (e) {
      alert('서버 오류로 삭제에 실패하였습니다. 관리자에게 문의 부탁드립니다.');
      return;
    }

    alert('삭제에 성공하였습니다.');
    router.push('/');
  }, [router.query.ID]);

  return (
    <>
      <S.CareGiverDetail>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <Link href={`${router.query.ID}/edit`} passHref>
              <S.StyledLink>
                <S.EditButton>세부정보 수정</S.EditButton>
              </S.StyledLink>
            </Link>
            <S.DeleteButton onClick={handleDeleteCareWorker}>요양보호사 삭제</S.DeleteButton>
            <S.Table>
              <tbody>
                <tr>
                  <td rowSpan={3} className="profile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src={careWorker.profile} />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="infovalue">{careWorker.name}</td>
                  <th>생년월일</th>
                  <td className="infovalue">
                    {careWorker.birthDay && careWorker.age
                      ? `${careWorker.birthDay} (${careWorker.age}세)`
                      : ''}
                  </td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td className="infovalue">{careWorker.gender}</td>
                  <th>휴대전화</th>
                  <td className="infovalue">{careWorker.phoneNumber}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td colSpan={3}>
                    {careWorker.zipCode && `(${careWorker.zipCode})`} {careWorker.address}{' '}
                    {careWorker.detailAddress}
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
                  <td className="memo">{careWorker.description}</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>활동 지역</S.SectionTitle>
            <S.Table>
              <tbody>
                {careWorker.careWorkerAreas?.length > 0 ? (
                  chunk(careWorker.careWorkerAreas, 3).map((row, key) => {
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
                      {careWorker.careWorkerMetas &&
                        careWorker.careWorkerMetas
                          .filter((meta) => meta.type === CAPABILITY)
                          .map((meta, i) => (
                            <S.AvailabilityInfoItem key={`${CAPABILITY}-${i}`}>
                              {meta.key}
                            </S.AvailabilityInfoItem>
                          ))}
                    </S.AvailabilityInfoList>
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>종교</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td className="personality">
                    <S.AvailabilityInfoList>
                      {careWorker.careWorkerMetas &&
                        careWorker.careWorkerMetas
                          .filter((meta) => meta.type === RELIGION)
                          .map((meta, i) => (
                            <S.AvailabilityInfoItem key={`${RELIGION}-${i}`}>
                              {meta.key}
                            </S.AvailabilityInfoItem>
                          ))}
                    </S.AvailabilityInfoList>
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>
              요양보호사 스케줄
              <span>요양보호사의 일정을 기록합니다.</span>
            </S.SectionTitle>
            <S.TimeTable>
              <tbody>
                <tr>
                  <th></th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th className="saturday">토</th>
                  <th className="sunday right">일</th>
                </tr>
                {[...Array(10)].map((_time, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {index < 1 ? 0 : ''}
                        {index + 9}:00
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="right"></td>
                    </tr>
                  );
                })}
              </tbody>
              {careWorker.careWorkerSchedules?.map((schedule, scheduleIndex) => {
                const [startHourString, startMinuteString] = schedule.startAt.split(':');
                const [startHour, startMinute] = schedule.startAt.split(':').map((a) => parseInt(a)); // prettier-ignore
                const [endHourString, endMinuteString] = schedule.endAt.split(':');
                const [endHour, endMinute] = schedule.endAt.split(':').map((a) => parseInt(a));

                return (
                  <S.TimeContainer
                    key={`schedule-${scheduleIndex}`}
                    day={DAY_LIST.indexOf(schedule.day as DayType)}
                    startTime={startHour + startMinute / 60}
                    endTime={endHour + endMinute / 60}
                  >
                    <S.TimeItem>
                      {startHourString}:{startMinuteString}
                      <br />~<br />
                      {endHourString}:{endMinuteString}
                    </S.TimeItem>
                  </S.TimeContainer>
                );
              })}
            </S.TimeTable>
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
                {careWorker.careWorkerCareers?.length > 0 ? (
                  careWorker.careWorkerCareers.map((career, idx) => (
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
                )}
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
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
          </S.Section>
        </S.InnerContent>
      </S.CareGiverDetail>
    </>
  );
}
