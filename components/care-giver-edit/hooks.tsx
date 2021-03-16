import { useCallback, useEffect, useRef, useState } from 'react';
import { DayType } from '../../common/types/date';
import BusinessArea from '../../model/business-area';
import CareWorkerSchedule from '../../model/care-worker-schedule';
import axios from 'axios';
import CreateCareGiverRequest from './model/create-care-giver-request';
import Career from './model/career';
import { useRouter } from 'next/router';
import CareWorker from '../../model/care-worker';
import { useCareCenter } from '../../context/care-center';

export const useCareGiverUpsert = (isNew: boolean) => {
  const careCenter = useCareCenter();
  const router = useRouter();
  const [id, setId] = useState('');

  const [isRequesting, setIsRequesting] = useState(false);
  const [careWorker, setCareWorker] = useState(CreateCareGiverRequest.noArgsConstructor());
  const [careWorkerCapabilities, setCareWorkerCapabilities] = useState([] as string[]);
  const [careWorkerSchedules, setCareWorkerSchedules] = useState([
    CareWorkerSchedule.noArgsConstructor(),
  ]);
  const [careWorkerCareers, setCareWorkerCareers] = useState([Career.noArgsConstructor()]);
  const [careWorkerAreas, setCareWorkerAreas] = useState([BusinessArea.noArgsConstructor()]);

  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isNew || !router.query.ID || careCenter.isValidating || !careCenter.isLoggedIn) return;

    (async () => {
      try {
        const response = await axios.get(`/api/care-worker/${router.query.ID}`);
        const c = response.data as CareWorker;

        setId(c.id);
        setCareWorker(
          CreateCareGiverRequest.allArgsConstructor(
            c.name,
            c.gender !== '남성',
            c.age,
            c.phoneNumber,
            c.profile,
            c.address,
            c.description
          )
        );
        setMemo(c.description);
        setCareWorkerCapabilities(c.careWorkerMetas.map((meta) => meta.key));
        setCareWorkerCareers(
          c.careWorkerCareers.map((career) =>
            Career.allArgsConstructor(career.workplace, career.recipient, career.duration)
          )
        );
        setCareWorkerAreas(
          c.careWorkerAreas.map((area) =>
            BusinessArea.allArgsConstructor(area.city, area.gu, area.dong)
          )
        );

        const allSchedules = c.careWorkerSchedules.reduce((acc, sc) => {
          if (sc.startAt.split(':').length < 3 || sc.endAt.split(':').length < 3) return acc;
          const [stt, stm] = sc.startAt.split(':').map((m) => parseInt(m));
          const [et, em] = sc.endAt.split(':').map((m) => parseInt(m));

          const matchedSchedule = acc.find(
            (cws) =>
              cws.startHour === stt &&
              cws.startMinute === stm &&
              cws.endHour === et &&
              cws.endMinute === em
          );

          if (matchedSchedule) {
            matchedSchedule.days.push(sc.day);
          } else {
            const newSchedule = CareWorkerSchedule.allArgsConstructor(stt, stm, et, em);
            newSchedule.days.push(sc.day);
            acc.push(newSchedule);
          }

          return acc;
        }, [] as CareWorkerSchedule[]);

        setCareWorkerSchedules(allSchedules);
      } catch {
        alert('잘못된 접근입니다.');
        router.push('/');
      }
    })();
  }, [router, careCenter]);

  const handleUpdateCareGiver = useCallback(
    (key: keyof CreateCareGiverRequest) => (e: any) => {
      setCareWorker({
        ...careWorker,
        [key]: e.target.value,
      });
    },
    [careWorker]
  );

  const handleUpdateGender = useCallback(
    (isFemale: boolean) => () => {
      setCareWorker({ ...careWorker, isFemale });
    },
    [careWorker]
  );

  const handleUpdateAge = useCallback(
    (e: any) => {
      const parsedAge = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
      setCareWorker({ ...careWorker, age: parsedAge });
    },
    [careWorker]
  );

  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);

  const toggleDays = (selectedDaysIndex: number, day: DayType) => {
    const newSchedules = [...careWorkerSchedules];
    newSchedules[selectedDaysIndex].toggleDay(day);
    setCareWorkerSchedules(newSchedules);
  };

  const toggleCapability = (careInfo: string) => {
    if (careWorkerCapabilities.includes(careInfo)) {
      setCareWorkerCapabilities((selectedCareInfo) =>
        selectedCareInfo.filter((selected) => selected !== careInfo)
      );
      return;
    }
    setCareWorkerCapabilities([...careWorkerCapabilities, careInfo]);
  };

  const onChangeImage = async (e: any) => {
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
      setCareWorker({
        ...careWorker,
        profile: url,
      });
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
        setCareWorker({
          ...careWorker,
          address: fullAddress,
        });
      },
    }).open();
  };

  const handleClickCreateButton = async () => {
    const avilableSchedule = careWorkerSchedules.filter((a) => !a.isEmpty());
    if (avilableSchedule.some((a) => !a.isValidSchedule())) {
      alert(
        '요양보호사 스케줄 양식에 오류가 있습니다. \n\n시작시간은 종료시간을 넘어갈 수 없습니다.'
      );
      return;
    }
    setIsRequesting(true);

    try {
      await axios.post('/api/care-worker', {
        id,
        careWorker,
        careWorkerCapabilities,
        careWorkerSchedules: avilableSchedule,
        careWorkerCareers,
        careWorkerAreas,
      });
    } catch (e) {
      alert('요양보호사 추가에 실패하였습니다.');
      setIsRequesting(false);
      return;
    }

    alert('요양보호사 추가에 성공하였습니다.');
    router.push('/list');
  };

  return {
    careWorker,
    memo,
    careWorkerCareers,
    memoRef,
    setMemo,
    setCareWorkerCareers,
    careWorkerSchedules,
    careWorkerCapabilities,
    toggleCapability,
    setCareWorkerSchedules,
    toggleDays,
    openAddressModal,
    careWorkerAreas,
    setCareWorkerAreas,
    onChangeImage,
    handleUpdateGender,
    handleUpdateAge,
    handleUpdateCareGiver,
    handleClickCreateButton,
    isRequesting,
  };
};
