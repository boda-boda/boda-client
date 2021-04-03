import { useCallback, useEffect, useRef, useState } from 'react';
import { DayType } from '../../common/types/date';
import BusinessArea from '../../model/business-area';
import {
  CareWorkerSchedule,
  toggleDayOfCareWorkerSchedule,
  isCareWorkerScheduleValid,
  isCareWorkerScheduleRangeValid,
} from '../../model/care-worker-schedule';
import axios from 'axios';
import CreateCareGiverRequest from './model/create-care-giver-request';
import Career from './model/career';
import { useRouter } from 'next/router';
import CareWorker from '../../model/care-worker';
import { useCareCenter } from '../../context/care-center';
import {
  CAPABILITY,
  RELIGION,
  WORKER_MAN_SMALL_IMAGE_URL,
  WORKER_WOMAN_SMALL_IMAGE_URL,
} from '../../constant';
import { validateCareWorker } from '../../common/lib/validate';

export const useCareGiverUpsert = (isNew: boolean) => {
  const careCenter = useCareCenter();
  const router = useRouter();
  const [id, setId] = useState('');

  const [isRequesting, setIsRequesting] = useState(false);
  const [careWorker, setCareWorker] = useState(CreateCareGiverRequest.noArgsConstructor());
  const [careWorkerCapabilities, setCareWorkerCapabilities] = useState([] as string[]);
  const [careWorkerReligions, setCareWorkerReligions] = useState([] as string[]);
  const [careWorkerSchedules, setCareWorkerSchedules] = useState([
    CareWorkerSchedule.noArgsConstructor(),
  ]);

  const [careWorkerCareers, setCareWorkerCareers] = useState([Career.noArgsConstructor()]);
  const [careWorkerAreas, setCareWorkerAreas] = useState([BusinessArea.noArgsConstructor()]);

  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const handleDeleteCurrentAddress = async () => {
    if (!window.confirm('현재 입력된 주소를 삭제하시겠습니까?')) return;

    setCareWorker({ ...careWorker, address: '', zipCode: '' });
  };

  useEffect(() => {
    if (
      isNew ||
      !router.query.ID ||
      !careCenter ||
      careCenter.isValidating ||
      !careCenter.isLoggedIn
    )
      return;

    (async () => {
      try {
        const response = await axios.get(`/care-worker/${router.query.ID}`);
        const c = response.data as CareWorker;

        setId(c.id);
        setCareWorker(
          CreateCareGiverRequest.allArgsConstructor(
            c.name,
            c.gender !== '남성',
            c.birthDay?.split('-').join(''),
            c.phoneNumber,
            c.profile,
            c.zipCode,
            c.address,
            c.detailAddress,
            c.description
          )
        );
        setMemo(c.description);

        setCareWorkerCapabilities(
          c.careWorkerMetas.filter((meta) => meta.type == CAPABILITY).map((meta) => meta.key)
        );
        setCareWorkerReligions(
          c.careWorkerMetas.filter((meta) => meta.type == RELIGION).map((meta) => meta.key)
        );
        if (c.careWorkerCareers.length > 0)
          setCareWorkerCareers(
            c.careWorkerCareers.map((career) =>
              Career.allArgsConstructor(career.workplace, career.recipient, career.duration)
            )
          );
        if (c.careWorkerAreas.length > 0)
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
        if (allSchedules.length > 0) setCareWorkerSchedules(allSchedules);
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
      if (
        careWorker.profile !== WORKER_MAN_SMALL_IMAGE_URL &&
        careWorker.profile !== WORKER_WOMAN_SMALL_IMAGE_URL
      ) {
        setCareWorker({ ...careWorker, isFemale });
        return;
      }

      setCareWorker({
        ...careWorker,
        isFemale,
        profile: isFemale ? WORKER_WOMAN_SMALL_IMAGE_URL : WORKER_MAN_SMALL_IMAGE_URL,
      });
    },
    [careWorker]
  );

  const handleUpdateBirthday = useCallback(
    (e: any) => {
      setCareWorker({ ...careWorker, birthDay: e.target.value });
    },
    [careWorker]
  );

  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);

  const toggleDays = useCallback(
    (selectedDaysIndex: number, day: DayType) => {
      const newSchedules = [...careWorkerSchedules];
      toggleDayOfCareWorkerSchedule(newSchedules[selectedDaysIndex], day);
      setCareWorkerSchedules(newSchedules);
    },
    [careWorkerSchedules]
  );

  const toggleCapability = useCallback(
    (careInfo: string) => {
      if (careWorkerCapabilities.includes(careInfo)) {
        setCareWorkerCapabilities((selectedCareInfo) =>
          selectedCareInfo.filter((selected) => selected !== careInfo)
        );
        return;
      }
      setCareWorkerCapabilities([...careWorkerCapabilities, careInfo]);
    },
    [careWorkerCapabilities]
  );

  const toggleReligion = useCallback(
    (religion: string) => {
      if (careWorkerReligions.includes(religion)) {
        setCareWorkerReligions((selectedReligion) =>
          selectedReligion.filter((selected) => selected !== religion)
        );
        return;
      }
      setCareWorkerReligions([...careWorkerReligions, religion]);
    },
    [careWorkerReligions]
  );

  const onChangeImage = useCallback(
    async (e: any) => {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      try {
        const axiosInstance = axios.create({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const response = await axiosInstance.post('/care-worker/profile', formData);
        const url = response.data.Location;
        setCareWorker({ ...careWorker, profile: url });
      } catch {
        alert('이미지 업로드에 실패하였습니다. 잠시후 다시 시도해주세요.');
      }
    },
    [careWorker]
  );

  const openAddressModal = useCallback(() => {
    if (!window.daum) {
      alert('주소 검색 서비스 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setCareWorker({ ...careWorker, address: data.roadAddress, zipCode: data.zonecode });
      },
    }).open();
  }, [careWorker]);

  const handleClickCreateButton = async () => {
    if (!validateCareWorker(careWorker)) return;

    const availableSchedule = careWorkerSchedules.filter((a) => a.days.length !== 0);
    if (availableSchedule.some((a) => !isCareWorkerScheduleValid(a))) {
      alert(
        '요양보호사 스케줄 양식에 오류가 있습니다. \n\n시작시간은 종료시간을 넘어갈 수 없습니다.'
      );
      return;
    }

    if (availableSchedule.some((a) => !isCareWorkerScheduleRangeValid(a))) {
      alert(
        '요양보호사 스케줄 양식에 오류가 있습니다. \n\n 스케줄은 9시와 18시 사이로 입력해주세요.'
      );
      return;
    }

    if (!window.confirm('해당 변경사항을 저장하시겠습니까?')) return;
    const availableAreas = careWorkerAreas.filter((a) => a.city);
    const availableCareers = careWorkerCareers.filter((a) => a.workplace || a.recipient || a.duration); // prettier-ignore
    setIsRequesting(true);

    try {
      await axios.post('/care-worker', {
        careWorker,
        careWorkerCapabilities,
        careWorkerReligions,
        careWorkerSchedules: availableSchedule,
        careWorkerCareers: availableCareers,
        careWorkerAreas: availableAreas,
      });
    } catch (e) {
      alert('요양보호사 추가에 실패하였습니다. 관리자에게 문의 주시면 신속하게 도와드리겠습니다.');
      setIsRequesting(false);
      return;
    }

    alert('요양보호사 추가에 성공하였습니다.');
    router.push('/list');
  };

  const handleClickUpdateButton = async () => {
    if (!validateCareWorker(careWorker)) return;

    const availableSchedule = careWorkerSchedules.filter((a) => a.days.length !== 0);
    if (availableSchedule.some((a) => !isCareWorkerScheduleValid(a))) {
      alert(
        '요양보호사 스케줄 양식에 오류가 있습니다. \n\n시작시간은 종료시간을 넘어갈 수 없습니다.'
      );
      return;
    }

    if (availableSchedule.some((a) => !isCareWorkerScheduleRangeValid(a))) {
      alert(
        '요양보호사 스케줄 양식에 오류가 있습니다. \n\n 스케줄은 9시와 18시 사이로 입력해주세요.'
      );
      return;
    }

    if (!window.confirm('해당 변경사항을 저장하시겠습니까?')) return;
    const availableAreas = careWorkerAreas.filter((a) => a.city);
    const availableCareers = careWorkerCareers.filter((a) => a.workplace || a.recipient || a.duration); // prettier-ignore

    try {
      await axios.put('/care-worker', {
        id,
        careWorker,
        careWorkerCapabilities,
        careWorkerReligions,
        careWorkerSchedules: availableSchedule,
        careWorkerCareers: availableCareers,
        careWorkerAreas: availableAreas,
      });
    } catch (e) {
      alert('요양보호사 수정에 실패하였습니다. 관리자에게 문의 주시면 신속하게 도와드리겠습니다.');
      setIsRequesting(false);
      return;
    }

    alert('요양보호사 수정에 성공하였습니다.');
    router.push(`/list/${router.query.ID}`);
  };

  return {
    careWorker,
    setCareWorker,
    memo,
    careWorkerCareers,
    memoRef,
    setMemo,
    setCareWorkerCareers,
    careWorkerSchedules,
    careWorkerCapabilities,
    careWorkerReligions,
    toggleCapability,
    toggleReligion,
    setCareWorkerSchedules,
    toggleDays,
    openAddressModal,
    careWorkerAreas,
    setCareWorkerAreas,
    onChangeImage,
    handleUpdateGender,
    handleUpdateBirthday,
    handleUpdateCareGiver,
    handleClickUpdateButton,
    handleClickCreateButton,
    isRequesting,
    handleDeleteCurrentAddress,
  };
};
