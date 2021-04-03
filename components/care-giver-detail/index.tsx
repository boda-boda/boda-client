import React, { useCallback, useEffect, useState } from 'react';
import CareWorker from '../../model/care-worker';
import * as S from './styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import { chunk } from '../../common/lib';
import { CAPABILITY, DAY_LIST, RELIGION } from '../../constant';
import { DayType } from '../../common/types/date';
import Link from 'next/link';
import { useCareCenter } from '../../context/care-center';

export default function CareGiveDetailDemo() {
  const router = useRouter();
  const careCenter = useCareCenter();
  const [careWorker, setCareWorker] = useState(new CareWorker());

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
                <tr>
                  {careWorker.careWorkerAreas?.length > 0 ? (
                    chunk(careWorker.careWorkerAreas, 3).map((a, key) =>
                      a.map((areaItem, areaItemIndex) => {
                        return (
                          <td
                            className={`area ${
                              areaItemIndex === careWorker.careWorkerAreas.length - 1 && 'right'
                            }`}
                            key={`areaItem-${areaItemIndex}`}
                          >
                            {areaItem.city} {areaItem.gu} {areaItem.dong}
                          </td>
                        );
                      })
                    )
                  ) : (
                    <td>등록된 활동 지역이 없습니다.</td>
                  )}
                </tr>
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
        </S.InnerContent>
      </S.CareGiverDetail>
    </>
  );
}
