import React, { useEffect, useState } from 'react';
import CareWorker from '../../model/care-worker';
import * as S from './styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import { chunk } from '../../common/lib';
import { dayList } from '../../constant';
import { DayType } from '../../common/types/date';

export default function CareGiveDetail() {
  const router = useRouter();
  const [isLoadingCareWorker, setIsLoadingCareWorker] = useState(true);
  const [careWorker, setCareWorker] = useState(new CareWorker());
  console.log(careWorker.careWorkerSchedules);

  useEffect(() => {
    if (!router.query.ID) {
      router.push('/list');
      return;
    }

    (async () => {
      try {
        const response = await axios.get(`/api/care-worker/${router.query.ID}`);
        setCareWorker(response.data);
        setIsLoadingCareWorker(false);
      } catch (e) {
        alert('실퍃 ㅎ');
      }
    })();
  }, []);

  return (
    <>
      <S.CareGiverDetail>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <S.StyledLink href={`${router.query.ID}/edit`}>
              <S.EditButton>세부정보 수정</S.EditButton>
            </S.StyledLink>
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
                  <th>나이</th>
                  <td className="infovalue">{careWorker.age}세</td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td className="infovalue">{careWorker.gender}</td>
                  <th>연락처</th>
                  <td className="infovalue">{careWorker.phoneNumber}</td>
                </tr>
                <tr>
                  <th>지역</th>
                  <td colSpan={3}>{careWorker.address}</td>
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
                {careWorker.careWorkerAreas
                  ? chunk(careWorker.careWorkerAreas, 3).map((a, key) => (
                      <tr key={`a-${key}`}>
                        {a[0] && (
                          <td className="area">
                            {a[0].city} {a[0].gu} {a[0].dong}
                          </td>
                        )}
                        {a[1] && (
                          <td className="area">
                            {a[1].city} {a[1].gu} {a[1].dong}
                          </td>
                        )}
                        {a[2] && (
                          <td className="area right">
                            {a[2].city} {a[2].gu} {a[2].dong}
                          </td>
                        )}
                      </tr>
                    ))
                  : null}
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
                        careWorker.careWorkerMetas.map((meta, i) => (
                          <S.AvailabilityInfoItem key={`${meta}-${i}`}>
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
            <S.SectionTitle>요양보호사 스케줄</S.SectionTitle>
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
                {[...Array(10)].map((time, index) => {
                  return (
                    <tr>
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
              {careWorker.careWorkerSchedules?.map((schedule) => {
                const [startHourString, startMinuteString] = schedule.startAt.split(':');
                const [startHour, startMinute] = schedule.startAt.split(':').map((a) => parseInt(a)); // prettier-ignore
                const [endHourString, endMinuteString] = schedule.endAt.split(':');
                const [endHour, endMinute] = schedule.endAt.split(':').map((a) => parseInt(a));

                return (
                  <S.TimeContainer
                    day={dayList.indexOf(schedule.day as DayType)}
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
                {careWorker.careWorkerCareers?.map((career, idx) => (
                  <tr key={`career-${idx}`}>
                    <td className="career long">{career.workplace}</td>
                    <td className="career">{career.recipient}</td>
                    <td className="career right">{career.duration}</td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.Section>
        </S.InnerContent>
      </S.CareGiverDetail>
    </>
  );
}
