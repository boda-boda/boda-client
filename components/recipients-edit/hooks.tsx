import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CreateRecipientRequest from './model/create-recipient-request';
import { useRouter } from 'next/router';
import { useCareCenter } from '../../context/care-center';
import { WORKER_MAN_SMALL_IMAGE_URL, WORKER_WOMAN_SMALL_IMAGE_URL } from '../../constant';
import { validateCareWorker, validateRecipient } from '../../common/lib/validate';

export const useRecipientsUpsert = (isNew: boolean) => {
  const careCenter = useCareCenter();
  const router = useRouter();
  const [id, setId] = useState('');

  const [isRequesting, setIsRequesting] = useState(false);
  const [recipient, setRecipient] = useState(CreateRecipientRequest.noArgsConstructor());
  const [recipientCapabilities, setRecipientCapabilities] = useState([] as string[]);
  console.log(recipient);
  console.log(recipientCapabilities);

  const [memo, setMemo] = useState('');
  const [memo2, setMemo2] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const memoRef2 = useRef<HTMLTextAreaElement>(null);

  const handleDeleteCurrentAddress = async () => {
    if (!window.confirm('현재 입력된 주소를 삭제하시겠습니까?')) return;

    setRecipient({ ...recipient, address: '', zipCode: '' });
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
        /*
        const response = await axios.get(`/recipient/${router.query.ID}`);
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
        */
      } catch {
        alert('잘못된 접근입니다.');
        router.push('/');
      }
    })();
  }, [router, careCenter]);

  const handleUpdateRecipient = useCallback(
    (key: keyof CreateRecipientRequest) => (e: any) => {
      setRecipient({
        ...recipient,
        [key]: e.target.value,
      });
    },
    [recipient]
  );

  const handleUpdateGender = useCallback(
    (isFemale: boolean) => () => {
      if (
        recipient.profile !== WORKER_MAN_SMALL_IMAGE_URL &&
        recipient.profile !== WORKER_WOMAN_SMALL_IMAGE_URL
      ) {
        setRecipient({ ...recipient, isFemale });
        return;
      }

      setRecipient({
        ...recipient,
        isFemale,
        profile: isFemale ? WORKER_WOMAN_SMALL_IMAGE_URL : WORKER_MAN_SMALL_IMAGE_URL,
      });
    },
    [recipient]
  );

  const handleUpdateAge = useCallback(
    (e: any) => {
      setRecipient({ ...recipient, age: parseInt(e.target.value) });
    },
    [recipient]
  );

  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);

  const toggleCapability = useCallback(
    (careInfo: string) => {
      if (recipientCapabilities.includes(careInfo)) {
        setRecipientCapabilities((selectedCareInfo) =>
          selectedCareInfo.filter((selected) => selected !== careInfo)
        );
        return;
      }
      setRecipientCapabilities([...recipientCapabilities, careInfo]);
    },
    [recipientCapabilities]
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
        setRecipient({ ...recipient, profile: url });
      } catch {
        alert('이미지 업로드에 실패하였습니다. 잠시후 다시 시도해주세요.');
      }
    },
    [recipient]
  );

  const openAddressModal = useCallback(() => {
    if (!window.daum) {
      alert('주소 검색 서비스 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setRecipient({ ...recipient, address: data.roadAddress, zipCode: data.zonecode });
      },
    }).open();
  }, [recipient]);

  const handleClickCreateButton = async () => {
    if (!validateRecipient(recipient)) return;

    if (!window.confirm('해당 변경사항을 저장하시겠습니까?')) return;
    setIsRequesting(true);

    try {
      await axios.post('/recipient', {
        ...recipient,
        recipientCapabilities,
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
    if (!validateRecipient(recipient)) return;

    if (!window.confirm('해당 변경사항을 저장하시겠습니까?')) return;

    try {
      await axios.put('/recipient', {
        id,
        ...recipient,
        recipientCapabilities,
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
    recipient,
    setRecipient,
    memo,
    memo2,
    memoRef,
    memoRef2,
    setMemo,
    setMemo2,
    recipientCapabilities,
    toggleCapability,
    openAddressModal,
    onChangeImage,
    handleUpdateGender,
    handleUpdateAge,
    handleUpdateRecipient,
    handleClickUpdateButton,
    handleClickCreateButton,
    isRequesting,
    handleDeleteCurrentAddress,
  };
};
