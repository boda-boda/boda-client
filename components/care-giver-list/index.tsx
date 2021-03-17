import React, { useCallback, useEffect, useState } from 'react';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import Link from 'next/link';
import { dayList, careInfoList, seoulGuDong } from '../../constant';
import CareWorkerSchedule from '../../model/care-worker-schedule';
import { DayType } from '../../common/types/date';
import axios from 'axios';
import { useCareCenter } from '../../context/care-center';
import CareWorker from '../../model/care-worker';

interface CareGiverListProps {
  isMyCaregiver: boolean;
}

const slicedCareInfoList = [];
for (let i = 0; i < careInfoList.length; i += 5)
  slicedCareInfoList.push(careInfoList.slice(i, i + 5));

export default function CareGiverList({ isMyCaregiver }: CareGiverListProps) {
  const careCenter = useCareCenter();

  const [careWorkers, setCareWorkers] = useState([] as CareWorker[]);
  const [filteredCareWorkers, setFilteredCareWorkers] = useState([] as CareWorker[]);

  useEffect(() => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;

    (async () => {
      try {
        const response = await axios.get('/care-worker');
        setCareWorkers(response.data);
        setFilteredCareWorkers(response.data);
      } catch (e) {}
    })();
  }, [careCenter]);

  const [rerender, setRerender] = useState(false);

  const [schedules, setSchedules] = useState([CareWorkerSchedule.noArgsConstructor()]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);

  const [city, setCity] = useState('-1');
  const [gu, setGu] = useState('-1');
  const [dong, setDong] = useState('-1');

  const toggleDays = (selectedDaysIndex: number, day: DayType) => {
    const newSchedules = [...schedules];
    newSchedules[selectedDaysIndex].toggleDay(day);
    setSchedules(newSchedules);
  };

  const toggleCareInfo = (careInfo: string) => {
    if (selectedCareInfo.includes(careInfo)) {
      setSelectedCareInfo((selectedCareInfo) =>
        selectedCareInfo.filter((selected) => selected !== careInfo)
      );
      return;
    }
    setSelectedCareInfo([...selectedCareInfo, careInfo]);
  };

  const handleReset = useCallback(() => {
    if (!confirm('검색 조건을 초기화하시겠습니까?')) return;

    setCity('-1');
    setGu('-1');
    setDong('-1');
    setSchedules([CareWorkerSchedule.noArgsConstructor()]);
    setSelectedCareInfo([]);
    setFilteredCareWorkers(careWorkers);
  }, [careWorkers]);

  const filterArea = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) =>
      cw.careWorkerAreas.some(
        (area) =>
          (area.city === city || city === '-1') &&
          (area.gu === gu || gu === '-1') &&
          (area.dong === dong || dong === '-1')
      )
    );

    return result;
  };

  const filterSchedule = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) =>
      cw.careWorkerSchedules.every((singleSchedule) => {
        //여기 아직 미구현
      })
    );

    return result;
  };

  const filterCareInfo = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) =>
      selectedCareInfo.every((careInfo) =>
        cw.careWorkerMetas
          .filter((meta) => meta.type === 'Capability')
          .map((meta) => meta.key)
          .includes(careInfo)
      )
    );
    return result;
  };

  const handleSearch = () => {
    setFilteredCareWorkers(filterCareInfo(filterArea(filterSchedule(careWorkers))));
  };

  return (
    <>
      <S.CgList>
        <S.Section isBackgroundColored={false}>
          <S.InnerContent>
            <S.SectionTitle>요양보호사 검색</S.SectionTitle>
            <S.FilterTable>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td>
                    <S.DropDown onChange={(e) => setCity(e.target.value)} defaultValue="">
                      <option value="" disabled hidden>
                        시/도 선택
                      </option>
                      <option value="서울특별시">서울특별시</option>
                    </S.DropDown>
                    <S.DropDown onChange={(e) => setGu(e.target.value)} defaultValue="">
                      <option value="-1">전체</option>
                      {city === '-1'
                        ? null
                        : seoulGuDong.map((gudong, idx) => (
                            <option key={`${gudong.gu}-${idx}`} value={gudong.gu}>
                              {gudong.gu}
                            </option>
                          ))}
                    </S.DropDown>
                    <S.DropDown onChange={(e) => setDong(e.target.value)} defaultValue="">
                      <option value="-1">전체</option>
                      {gu === '-1'
                        ? null
                        : seoulGuDong
                            .find((gudong) => gudong.gu === gu)
                            ?.dongs.map((dong, idx) => (
                              <option key={`${dong}-${idx}`} value={dong}>
                                {dong}
                              </option>
                            ))}
                    </S.DropDown>
                  </td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td style={{ padding: 0 }}>
                    {schedules.map((schedule, scheduleIndex) => {
                      return (
                        <S.TimeSelectContainer
                          isLast={schedules.length - 1 === scheduleIndex}
                          key={`timeselectcontainer-${scheduleIndex}`}
                        >
                          <S.TdFlexBox>
                            {dayList.map((day) => {
                              return (
                                <S.ToggleButton
                                  isSelected={schedule.isDayIncluded(day)}
                                  className="square"
                                  onClick={() => toggleDays(scheduleIndex, day)}
                                  key={`dayListItem-${day}`}
                                >
                                  {day}
                                </S.ToggleButton>
                              );
                            })}
                          </S.TdFlexBox>
                          <S.TdFlexBox>
                            <S.ClockSelectContainer>
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.startHour ? schedule.startHour : 0}
                                onChange={(e) => {
                                  const currentHour = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.startHour = parseInt(currentHour);
                                  if (schedule.startHour >= 24) schedule.startHour = 23;
                                  setRerender(!rerender);
                                }}
                              />
                              시
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.startMinute ? schedule.startMinute : 0}
                                onChange={(e) => {
                                  const currentMinute = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.startMinute = parseInt(currentMinute);
                                  if (schedule.startMinute >= 60) schedule.startMinute = 59;
                                  setRerender(!rerender);
                                }}
                              />
                              분
                            </S.ClockSelectContainer>
                            부터
                            <S.ClockSelectContainer>
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.endHour ? schedule.endHour : 0}
                                onChange={(e) => {
                                  const currentHour = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.endHour = parseInt(currentHour);
                                  if (schedule.endHour >= 24) schedule.endHour = 23;
                                  setRerender(!rerender);
                                }}
                              />
                              시
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.endMinute ? schedule.endMinute : 0}
                                onChange={(e) => {
                                  const currentMinute = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.endMinute = parseInt(currentMinute);
                                  if (schedule.endMinute >= 60) schedule.endMinute = 59;
                                  setRerender(!rerender);
                                }}
                              />
                              분
                            </S.ClockSelectContainer>
                            까지
                          </S.TdFlexBox>
                          {schedules.length - 1 === scheduleIndex ? (
                            <S.AddButton
                              onClick={() => {
                                setSchedules([
                                  ...schedules,
                                  CareWorkerSchedule.noArgsConstructor(),
                                ]);
                              }}
                            >
                              <PlusIconSVG />
                            </S.AddButton>
                          ) : (
                            <S.AddButton
                              onClick={() =>
                                setSchedules((schedules) =>
                                  schedules.filter((_, i) => i !== scheduleIndex)
                                )
                              }
                            >
                              <MinusIconSVG />
                            </S.AddButton>
                          )}
                        </S.TimeSelectContainer>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th rowSpan={2}>가능 조건</th>
                  <td className="innerTable">
                    <table>
                      <tbody>
                        {slicedCareInfoList.map((slicedCareInfo, row) => {
                          return (
                            <tr key={`${row}`}>
                              {slicedCareInfo.map((careInfo, index) => {
                                return (
                                  <td
                                    className={`available ${index === 4 && 'right'}`}
                                    key={`${index}`}
                                  >
                                    {careInfo}
                                    <S.CheckBox
                                      type="checkbox"
                                      onChange={() => toggleCareInfo(careInfo)}
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </S.FilterTable>
            <S.ResetButtonContainer>
              <S.FilterButton onClick={handleReset} isReset>
                초기화
              </S.FilterButton>
              <S.FilterButton onClick={handleSearch}>검색</S.FilterButton>
            </S.ResetButtonContainer>
          </S.InnerContent>
        </S.Section>
        <S.Section isBackgroundColored={true}>
          <S.InnerContent>
            <S.SectionTitle>검색 결과</S.SectionTitle>
            <S.CardList>
              {filteredCareWorkers.map((worker, idx) => (
                <Link
                  key={`worker-${idx}`}
                  href={{
                    pathname: '/list/[id]',
                  }}
                  as={`/list/${worker.id}`}
                  passHref
                >
                  <S.StyledLink>
                    <S.Card>
                      <S.ProfileImage src={worker.profile} />
                      <S.InfoContainer>
                        <S.BasicInfo>
                          {worker.name} ({worker.age}/{worker.gender[0]})
                        </S.BasicInfo>
                        {/* <S.Time>1시간 전</S.Time> TODO: 이거 구현해야함 백엔드에서 */}
                        <S.InfoTable>
                          <tbody>
                            <tr>
                              <td>
                                <S.SVGIconBox>
                                  <PhoneNumberIconSVG />
                                </S.SVGIconBox>
                              </td>
                              <th>연락처</th>
                              <td>{worker.phoneNumber}</td>
                            </tr>
                            <tr>
                              <td>
                                <S.SVGIconBox>
                                  <CareInfoIconSVG />
                                </S.SVGIconBox>
                              </td>
                              <th>가능 조건</th>
                              <td>
                                <S.InfoItemList>
                                  {worker.careWorkerMetas.map((meta, index) => {
                                    return (
                                      <S.InfoItem key={`careInfoItem-${index}`}>
                                        {meta.key}
                                      </S.InfoItem>
                                    );
                                  })}
                                </S.InfoItemList>
                              </td>
                            </tr>
                          </tbody>
                        </S.InfoTable>
                      </S.InfoContainer>
                    </S.Card>
                  </S.StyledLink>
                </Link>
              ))}
            </S.CardList>
          </S.InnerContent>
        </S.Section>
      </S.CgList>
    </>
  );
}
