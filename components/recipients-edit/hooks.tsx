import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CreateRecipientRequest from './model/create-recipient-request';
import { useRouter } from 'next/router';
import { useCareCenter } from '../../context/care-center';
import {
  CAPABILITY,
  WORKER_MAN_SMALL_IMAGE_URL,
  WORKER_WOMAN_SMALL_IMAGE_URL,
} from '../../constant';
import { validateRecipient } from '../../common/lib/validate';
import Recipient from '../../model/recipient';
import { RecipientTime, toggleDayOfRecipientTime } from '../../model/recipient-time';
import { DayType } from '../../common/types/date';

export const useRecipientsUpsert = (isNew: boolean) => {
  const careCenter = useCareCenter();
  const router = useRouter();
  const [id, setId] = useState('');

  const [isRequesting, setIsRequesting] = useState(false);
  const [recipient, setRecipient] = useState(CreateRecipientRequest.noArgsConstructor());
  const [recipientCapabilities, setRecipientCapabilities] = useState([] as string[]);
  const [rerender, setRerender] = useState(false);
  const [schedules, setSchedules] = useState([RecipientTime.noArgsConstructor()]);

  const [memo, setMemo] = useState('');
  const [memo2, setMemo2] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const memoRef2 = useRef<HTMLTextAreaElement>(null);

  const handleDeleteCurrentAddress = async () => {
    if (!window.confirm('현재 입력된 주소를 삭제하시겠습니까?')) return;

    setRecipient({ ...recipient, address: '', zipCode: '' });
  };

  const toggleDaysOfRecipientTime = (selectedDaysIndex: number, day: DayType) => {
    const newSchedules = [...schedules];
    toggleDayOfRecipientTime(newSchedules[selectedDaysIndex], day);
    setSchedules(newSchedules);
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
        const response = await axios.get(`/recipient/${router.query.ID}`);
        const c = response.data as Recipient;

        setId(c.id);
        setRecipient(
          CreateRecipientRequest.allArgsConstructor(
            c.name,
            c.isFemale,
            c.age,
            c.grade,
            c.phoneNumber,
            c.profile,
            c.zipCode,
            c.address,
            c.detailAddress,
            c.description,
            c.note,
            c.hourlyWage,
            c.familyType,
            c.religion,
            c.serviceTime
          )
        );
        setMemo(c.description);
        setMemo2(c.note);

        setRecipientCapabilities(
          c.recipientMetas.filter((meta) => meta.type == CAPABILITY).map((meta) => meta.key)
        );
      } catch {
        alert('잘못된 접근입니다.');
        router.push('/recipients');
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
      await axios.post(`/recipient`, {
        ...recipient,
        recipientCapabilities,
      });
    } catch (e) {
      console.log(recipientCapabilities);
      alert('수급자 추가에 실패하였습니다. 관리자에게 문의 주시면 신속하게 도와드리겠습니다.');
      setIsRequesting(false);
      return;
    }

    alert('수급자 추가에 성공하였습니다.');
    router.push('/recipients');
  };

  const handleClickUpdateButton = async () => {
    if (!validateRecipient(recipient)) return;

    if (!window.confirm('해당 변경사항을 저장하시겠습니까?')) return;

    try {
      console.log(recipientCapabilities);

      await axios.put(`/recipient/${router.query.ID}`, {
        id,
        ...recipient,
        recipientCapabilities,
      });
    } catch (e) {
      alert('수급자 수정에 실패하였습니다. 관리자에게 문의 주시면 신속하게 도와드리겠습니다.');
      setIsRequesting(false);
      return;
    }

    alert('수급자 수정에 성공하였습니다.');
    router.push(`/recipients/${router.query.ID}`);
  };

  return {
    recipient,
    setRecipient,
    rerender,
    setRerender,
    memo,
    memo2,
    memoRef,
    memoRef2,
    setMemo,
    setMemo2,
    schedules,
    setSchedules,
    recipientCapabilities,
    toggleCapability,
    toggleDaysOfRecipientTime,
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
