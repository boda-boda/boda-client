import { useEffect, useRef, useState } from 'react';

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

  const [selectedDayList, setSelectedDayList] = useState([[]] as string[][]);
  const toggleDays = (selectedDays: string[], selectedDaysIndex: number, day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDayList((selectedDayList) =>
        selectedDayList.map((selectedDay, selectedDayIndex) => {
          if (selectedDayIndex === selectedDaysIndex)
            return selectedDay.filter((selected) => selected !== day);
          return selectedDay;
        })
      );
      return;
    }
    setSelectedDayList((selectedDayList) =>
      selectedDayList.map((selectedDay, selectedDayIndex) => {
        if (selectedDayIndex === selectedDaysIndex) return [...selectedDay, day];
        return selectedDay;
      })
    );
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
    selectedDayList,
    setSelectedDayList,
    toggleDays,
    openAddressModal,
  };
};
