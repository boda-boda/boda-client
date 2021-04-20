import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { range } from '../../common/lib';
import { useCareCenter } from '../../context/care-center';

export const useOuterCareGiverList = () => {
  const careCenter = useCareCenter();

  const [careWorkers, setCareWorkers] = useState([] as any[]);

  const [city, setCity] = useState('');
  const [gu, setGu] = useState('');
  const [dong, setDong] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligion, setSelectedReligion] = useState([] as string[]);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [careWorkersPerPage, setCareWorkersPerPage] = useState(10);
  console.log(currentPage);
  console.log(maxPage);

  const getPaginationBarNumbers = () => {
    if (maxPage <= 5) return range(1, maxPage);
    if (currentPage <= 3) return range(1, 5);
    if (maxPage - currentPage < 2) {
      return range(maxPage - 4, maxPage);
    } else return range(currentPage - 2, currentPage + 2);
  };

  const toggleTime = (time: string) => {
    if (time === selectedTime) {
      setSelectedTime('');
      return;
    }
    setSelectedTime(time);
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

    setCity('');
    setGu('');
    setDong('');
    setSelectedCareInfo([] as string[]);
    setSelectedReligion([] as string[]);
  }, [careWorkers]);

  useEffect(() => {
    (async () => {
      if (!careCenter.isLoggedIn) return;
      try {
        const response = await axios.get(
          `/outer-care-worker/search?from=${0}&size=${careWorkersPerPage}`
        );
        setCareWorkers(response.data.data);
        setMaxPage(Math.ceil(response.data.total / careWorkersPerPage));
        setCurrentPage(1);
      } catch (e) {
        return;
      }
    })();
  }, [careCenter]);

  const onClickSearchOuterCareGiver = async () => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;

    let params = '';
    if (city) params += `&city=${city}`;
    if (gu) params += `&gu=${gu}`;
    if (dong) params += `&dong=${dong}`;
    if (selectedTime) params += `&schedule=${selectedTime}`;
    for (let i = 0; i < selectedCareInfo.length; i++) {
      params += `&capabilities=${selectedCareInfo[i]}`;
    }
    for (let i = 0; i < selectedReligion.length; i++) {
      params += `&religions=${selectedReligion[i]}`;
    }

    try {
      const response = await axios.get(
        `/outer-care-worker/search?from=${
          (currentPage - 1) * careWorkersPerPage
        }&size=${careWorkersPerPage}${params}`
      );

      setCareWorkers(response.data.data);
      setMaxPage(Math.ceil(response.data.total / careWorkersPerPage));
    } catch (e) {
      alert('검색에 실패하였습니다. 관리자에게 문의 부탁드립니다.');
      return;
    }
  };

  useEffect(() => {
    onClickSearchOuterCareGiver();
  }, [currentPage]);

  return {
    city,
    setCity,
    gu,
    setGu,
    dong,
    setDong,
    selectedTime,
    toggleTime,
    toggleCareInfo,
    careWorkers,
    selectedCareInfo,
    toggleReligion,
    selectedReligion,
    handleReset,
    careCenter,
    careWorkersPerPage,
    setCareWorkersPerPage,
    setCurrentPage,
    setMaxPage,
    currentPage,
    maxPage,
    getPaginationBarNumbers,
    onClickSearchOuterCareGiver,
  };
};
