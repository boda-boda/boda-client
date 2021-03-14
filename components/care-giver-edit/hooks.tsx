import { useEffect, useRef, useState } from 'react';
import { DayType } from '../../common/types/date';
import CareGiverSchedule from '../../model/care-giver-schedule';

export const useCareGiverUpsert = () => {
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const [careers, setCareers] = useState([['', '', '']]);
  const [profileImage, setProfileImage] = useState((null as unknown) as string);
  const memoRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);

  const [schedules, setSchedules] = useState([new CareGiverSchedule()]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);

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

  const openAddressModal = () => {
    if (!window.daum) {
      alert('주소 검색 서비스 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        let fullAddress = data.address;
        setAddress(fullAddress);
      },
    }).open();
  };

  return {
    address,
    memo,
    careers,
    profileImage,
    memoRef,
    setMemo,
    setCareers,
    setProfileImage,
    selectedCareInfo,
    setSelectedCareInfo,
    schedules,
    setSchedules,
    toggleDays,
    toggleCareInfo,
    openAddressModal,
  };
};
