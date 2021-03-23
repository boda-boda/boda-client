import React, { useCallback, useEffect, useState } from 'react';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import Link from 'next/link';
import {
  DAY_LIST,
  CARE_INFO_LIST,
  SEOUL_GU_DONG,
  KOREAN_CONSONANT_LIST,
  KOREAN_ASCII_LIST,
  LOCALSTORAGE_KEY,
  RELIGION_LIST,
} from '../../constant';
import {
  CareWorkerSchedule,
  isCareWorkerScheduleValid,
  toggleDayOfCareWorkerSchedule,
} from '../../model/care-worker-schedule';
import { DayType } from '../../common/types/date';
import axios from 'axios';
import { useCareCenter } from '../../context/care-center';
import CareWorker from '../../model/care-worker';

interface CareGiverListProps {
  isMyCaregiver: boolean;
}

const slicedCareInfoList = [];
for (let i = 0; i < CARE_INFO_LIST.length; i += 5)
  slicedCareInfoList.push(CARE_INFO_LIST.slice(i, i + 5));

const slicedReligionList = [];
for (let i = 0; i < RELIGION_LIST.length; i += 5)
  slicedReligionList.push(RELIGION_LIST.slice(i, i + 5));

export default function CareGiverList({ isMyCaregiver }: CareGiverListProps) {
  const careCenter = useCareCenter();

  const [rerender, setRerender] = useState(false);

  const [careWorkers, setCareWorkers] = useState([] as CareWorker[]);
  const [filteredCareWorkers, setFilteredCareWorkers] = useState([] as CareWorker[]);

  const [name, setName] = useState('');
  const [city, setCity] = useState('-1');
  const [gu, setGu] = useState('-1');
  const [dong, setDong] = useState('-1');
  const [schedules, setSchedules] = useState([CareWorkerSchedule.noArgsConstructor()]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligion, setSelectedReligion] = useState([] as string[]);
  const [selectedConsonantFilter, setSelectedConsonantFilter] = useState(-1);

  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

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

  const toggleDays = (selectedDaysIndex: number, day: DayType) => {
    const newSchedules = [...schedules];
    toggleDayOfCareWorkerSchedule(newSchedules[selectedDaysIndex], day);
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

  const toggleReligion = (religion: string) => {
    if (selectedReligion.includes(religion)) {
      setSelectedReligion((selectedReligion) =>
        selectedReligion.filter((selected) => selected !== religion)
      );
      return;
    }
    setSelectedReligion([...selectedReligion, religion]);
  };

  const handleReset = useCallback(() => {
    if (!confirm('검색 조건을 초기화하시겠습니까?')) return;

    setName('');
    setCity('-1');
    setGu('-1');
    setDong('-1');
    setSelectedConsonantFilter(-1);
    setSchedules([CareWorkerSchedule.noArgsConstructor()]);
    setSelectedCareInfo([] as string[]);
    setSelectedReligion([] as string[]);
    setFilteredCareWorkers(careWorkers);
  }, [careWorkers]);

  const filterByLetter = (letters: string[], cwName: string) => {
    if (letters.length > cwName.length) return false;

    return letters.every(
      (letter, index) =>
        cwName[index].charCodeAt(0) >=
          KOREAN_ASCII_LIST[KOREAN_CONSONANT_LIST.indexOf(letter)][0].charCodeAt(0) &&
        cwName[index].charCodeAt(0) <=
          KOREAN_ASCII_LIST[KOREAN_CONSONANT_LIST.indexOf(letter)][1].charCodeAt(0)
    );
  };

  const filterName = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) => {
      if (name === '-1') return true;
      if (name.split('').every((letter) => KOREAN_CONSONANT_LIST.includes(letter))) {
        return filterByLetter(name.split(''), cw.name);
      }
      if (name.length > cw.name.length) return false;
      return cw.name.includes(name);
    });
    return result;
  };

  const filterArea = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) => {
      if (city === '-1') return true;
      return (
        cw.careWorkerAreas.length !== 0 &&
        cw.careWorkerAreas.some(
          (area) =>
            area.city === city &&
            (area.gu === gu || gu === '-1' || !area.gu) &&
            (area.dong === dong || dong === '-1' || !area.dong)
        )
      );
    });
    return result;
  };

  const filterSchedule = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) =>
      schedules.every((filterSchedule) =>
        cw.careWorkerSchedules.every((singleSchedule) =>
          filterSchedule.days.every(
            (day) =>
              singleSchedule.day !== day ||
              parseInt(singleSchedule.startAt.split(':')[0], 10) * 60 +
                parseInt(singleSchedule.startAt.split(':')[1], 10) >
                filterSchedule.endHour * 60 + filterSchedule.endMinute ||
              parseInt(singleSchedule.endAt.split(':')[0], 10) * 60 +
                parseInt(singleSchedule.endAt.split(':')[1], 10) <
                filterSchedule.startHour * 60 + filterSchedule.startMinute
          )
        )
      )
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
  const filterReligion = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) =>
      selectedReligion.every((religion) =>
        cw.careWorkerMetas
          .filter((meta) => meta.type === 'Capability')
          .map((meta) => meta.key)
          .includes(religion)
      )
    );
    return result;
  };
  const filterNameByLetter = (cws: CareWorker[]) => {
    if (selectedConsonantFilter === -1) return cws;
    const result = cws.filter(
      (cw: CareWorker) =>
        cw.name[0].charCodeAt(0) >= KOREAN_ASCII_LIST[selectedConsonantFilter][0].charCodeAt(0) &&
        cw.name[0].charCodeAt(0) <= KOREAN_ASCII_LIST[selectedConsonantFilter][1].charCodeAt(0)
    );
    return result;
  };

  const handleSearchOnClickSearchButton = () => {
    if (schedules.some((a) => !isCareWorkerScheduleValid(a))) {
      alert(
        '요양보호사 스케줄 양식에 오류가 있습니다. \n\n시작시간은 종료시간을 넘어갈 수 없습니다.'
      );
      return;
    }
    setFilteredCareWorkers(
      filterNameByLetter(filterSchedule(filterCareInfo(filterArea(filterName(careWorkers)))))
    );
    setSelectedConsonantFilter(-1);
  };

  const handleSearchOnClickConsonantFilterItem = () => {
    setFilteredCareWorkers(
      filterNameByLetter(filterSchedule(filterCareInfo(filterArea(filterName(careWorkers)))))
    );
  };

  useEffect(() => {
    if (selectedConsonantFilter === -1) handleSearchOnClickSearchButton();
    else handleSearchOnClickConsonantFilterItem();
  }, [selectedConsonantFilter, isLocalStorageLoaded]);

  // 로컬 스토리지에
  // prettier-ignore
  useEffect(() => {
    if(!filteredCareWorkers.length || isLocalStorageLoaded) return; // 이미 가져왔으면 안 함, careWorker가 없는 상황에는 안함
    const savedSearchParams = localStorage.getItem(LOCALSTORAGE_KEY.MY_CARE_WORKER_SEARCH_PARAMS);
    if (savedSearchParams === null) {
      setIsLocalStorageLoaded(true);
      return; // 저장된게 없으면 안 가져옴 (오류 방지)
    }
    const { name, city, gu, dong, schedules, selectedCareInfo, selectedConsonantFilter } = JSON.parse(savedSearchParams) as any;
    setName(name); setCity(city); setGu(gu); setDong(dong); setSchedules(schedules); setSelectedCareInfo(selectedCareInfo); setSelectedConsonantFilter(selectedConsonantFilter)
    setIsLocalStorageLoaded(true);
  }, [name, city, gu, dong, schedules, selectedCareInfo, filteredCareWorkers]);

  // 로컬 스토리지에 검색결과 저장 (작성 후 1초 후에 저장 - 디바운스를 위함) // TODO: 검증 및 최적화
  useEffect(() => {
    if (!isLocalStorageLoaded) return; // 한번도 가져온 적이 없으면 저장하지 않게 함

    const timeout = setTimeout(() => {
      localStorage.setItem(LOCALSTORAGE_KEY.MY_CARE_WORKER_SEARCH_PARAMS, JSON.stringify({
        name,city,gu,dong,schedules,selectedCareInfo, selectedConsonantFilter
      })) // prettier-ignore
    }, 500);
    return () => clearTimeout(timeout);
  }, [name, city, gu, dong, schedules, selectedCareInfo, selectedConsonantFilter, rerender]);

  return (
    <>
      <S.CgList>
        <S.Section isBackgroundColored={false}>
          <S.InnerContent>
            <S.SectionTitle>요양보호사 검색</S.SectionTitle>
            <S.FilterTable>
              <tbody>
                <tr>
                  <th>이름</th>
                  <td>
                    <S.TextInput
                      value={name}
                      onKeyPress={(e: any) => {
                        if (e.key === 'Enter') {
                          handleSearchOnClickSearchButton();
                          return;
                        }
                      }}
                      onChange={(e: any) => {
                        setName(e.target.value);
                      }}
                    ></S.TextInput>
                  </td>

                  <th>지역</th>
                  <td>
                    <S.DropDown
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        시/도 선택
                      </option>
                      <option value="서울특별시">서울특별시</option>
                    </S.DropDown>
                    <S.DropDown value={gu} onChange={(e) => setGu(e.target.value)} defaultValue="">
                      <option value="-1">전체</option>
                      {city === '-1'
                        ? null
                        : SEOUL_GU_DONG.map((gudong, idx) => (
                            <option key={`${gudong.gu}-${idx}`} value={gudong.gu}>
                              {gudong.gu}
                            </option>
                          ))}
                    </S.DropDown>
                    <S.DropDown
                      value={dong}
                      onChange={(e) => setDong(e.target.value)}
                      defaultValue=""
                    >
                      <option value="-1">전체</option>
                      {gu === '-1'
                        ? null
                        : SEOUL_GU_DONG.find((gudong) => gudong.gu === gu)?.dongs.map(
                            (dong, idx) => (
                              <option key={`${dong}-${idx}`} value={dong}>
                                {dong}
                              </option>
                            )
                          )}
                    </S.DropDown>
                  </td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td style={{ padding: 0 }} colSpan={3}>
                    {schedules.map((schedule, scheduleIndex) => {
                      return (
                        <S.TimeSelectContainer
                          isLast={schedules.length - 1 === scheduleIndex}
                          key={`timeselectcontainer-${scheduleIndex}`}
                        >
                          <S.TdFlexBox>
                            {DAY_LIST.map((day) => {
                              return (
                                <S.ToggleButton
                                  isSelected={schedule.days.includes(day)}
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
                          <S.PlusMinusButtonContainer>
                            <S.PlusMinusButton
                              hide={schedules.length - 1 !== scheduleIndex}
                              disabled={schedules.length - 1 !== scheduleIndex}
                              onClick={() => {
                                setSchedules([
                                  ...schedules,
                                  CareWorkerSchedule.noArgsConstructor(),
                                ]);
                              }}
                            >
                              <PlusIconSVG />
                            </S.PlusMinusButton>
                            <S.PlusMinusButton
                              onClick={() => {
                                if (schedules.length === 1) {
                                  setSchedules([
                                    ...schedules,
                                    CareWorkerSchedule.noArgsConstructor(),
                                  ]);
                                }
                                setSchedules((schedules) =>
                                  schedules.filter((_, i) => i !== scheduleIndex)
                                );
                              }}
                            >
                              <MinusIconSVG />
                            </S.PlusMinusButton>
                          </S.PlusMinusButtonContainer>
                        </S.TimeSelectContainer>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th>가능 조건</th>
                  <td className="innerTable" colSpan={3}>
                    <table>
                      <tbody>
                        {slicedCareInfoList.map((slicedCareInfo, row) => {
                          return (
                            <tr key={`${row}`}>
                              {slicedCareInfo.map((careInfo, index) => {
                                return (
                                  <td
                                    className={`available ${index === 4 && 'right'} ${
                                      row === slicedCareInfoList.length - 1 && 'last'
                                    }`}
                                    key={`${index}`}
                                    onClick={() => toggleCareInfo(careInfo)}
                                  >
                                    {careInfo}
                                    <S.CheckBox
                                      type="checkbox"
                                      checked={selectedCareInfo.includes(careInfo)}
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
                <tr>
                  <th className="innerTableHeader">종교</th>
                  <td className="innerTable" colSpan={3}>
                    <table>
                      <tbody>
                        {slicedReligionList.map((slicedReligion, row) => {
                          return (
                            <tr key={`${row}`}>
                              {slicedReligion.map((religion, index) => {
                                {
                                  console.log(slicedReligion.length);
                                }
                                return (
                                  <td
                                    className={`available ${index === 4 && 'right'} ${
                                      row === slicedReligionList.length - 1 && 'last'
                                    }`}
                                    key={`${index}`}
                                    onClick={() => toggleReligion(religion)}
                                  >
                                    {religion}
                                    <S.CheckBox
                                      type="checkbox"
                                      checked={selectedReligion.includes(religion)}
                                      onChange={() => toggleReligion(religion)}
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
              <S.FilterButton onClick={handleSearchOnClickSearchButton}>검색</S.FilterButton>
            </S.ResetButtonContainer>
          </S.InnerContent>
        </S.Section>
        <S.Section isBackgroundColored={true}>
          <S.InnerContent>
            <S.SectionTitle>검색 결과</S.SectionTitle>
            <S.ConsonantFilterList>
              <S.ConsonantFilterItem
                isClicked={selectedConsonantFilter === -1}
                onClick={() => {
                  setSelectedConsonantFilter(-1);
                }}
                isLeft
              >
                전체
              </S.ConsonantFilterItem>
              {KOREAN_CONSONANT_LIST.map((name, nameIndex) => (
                <S.ConsonantFilterItem
                  key={`name-${nameIndex}`}
                  isClicked={selectedConsonantFilter === nameIndex}
                  onClick={() => {
                    setSelectedConsonantFilter(nameIndex);
                  }}
                >
                  {name}
                </S.ConsonantFilterItem>
              ))}
            </S.ConsonantFilterList>
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
                        <S.InfoRow>
                          <S.SVGIconBox>
                            <PhoneNumberIconSVG />
                          </S.SVGIconBox>
                          <S.InfoType>휴대전화</S.InfoType>
                          <S.InfoValue>{worker.phoneNumber}</S.InfoValue>
                        </S.InfoRow>
                        <S.InfoRow>
                          <S.SVGIconBox>
                            <CareInfoIconSVG />
                          </S.SVGIconBox>
                          <S.InfoType>가능 조건</S.InfoType>
                          <S.InfoItemList>
                            {worker.careWorkerMetas.map((meta, index) => {
                              return (
                                <S.InfoItem key={`careInfoItem-${index}`}>{meta.key}</S.InfoItem>
                              );
                            })}
                          </S.InfoItemList>
                        </S.InfoRow>
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
