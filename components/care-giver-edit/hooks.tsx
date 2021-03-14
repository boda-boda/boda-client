import { useEffect, useRef, useState } from 'react';
import { DayType } from '../../common/types/date';
import BusinessArea from '../../model/business-area';
import CareGiverSchedule from '../../model/care-giver-schedule';
import axios from 'axios';
import { clear } from 'console';

export const useCareGiverUpsert = () => {
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const [careers, setCareers] = useState([['', '', '']]);
  const [profileImage, setProfileImage] = useState((null as unknown) as string);
  const [isFemale, setIsFemale] = useState(true);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [businessAreas, setBusinessAreas] = useState([new BusinessArea()]);
  const [changingImage, setChangingImage] = useState(false);

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

  const onChangeImage = async (e: any) => {
    setChangingImage(true);

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const axiosInstance = axios.create({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axiosInstance.post('/api/care-worker/profile', formData);
      const url = response.data.Location;
      setProfileImage(url);
    } catch {
      alert('이미지 업로드에 실패하였습니다. 잠시후 다시 시도해주세요.');
    }
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
    isFemale,
    setIsFemale,
    schedules,
    setSchedules,
    toggleDays,
    toggleCareInfo,
    openAddressModal,
    businessAreas,
    setBusinessAreas,
    onChangeImage,
  };
};
