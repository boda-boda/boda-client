import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { range } from '../../common/lib';
import { KOREAN_ASCII_LIST, PAGINATION_LENGTH } from '../../constant';
import { useCareCenter } from '../../context/care-center';
import CareWorker from '../../model/care-worker';
import { CareWorkerSchedule } from '../../model/care-worker-schedule';

export const useOuterCareGiverList = () => {
  const careCenter = useCareCenter();

  const [careWorkers, setCareWorkers] = useState([] as any[]);
  const [filteredCareWorkers, setFilteredCareWorkers] = useState([] as any[]);

  const [city, setCity] = useState('');
  const [gu, setGu] = useState('');
  const [dong, setDong] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [schedules, setSchedules] = useState([CareWorkerSchedule.noArgsConstructor()]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligion, setSelectedReligion] = useState([] as string[]);

  const [selectedConsonantFilter, setSelectedConsonantFilter] = useState(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);
  const [careWorkersPerPage, setCareWorkersPerPage] = useState(10);

  const indexOfLastCareworker = currentPage * careWorkersPerPage;
  const indexOfFirstCareworker = indexOfLastCareworker - careWorkersPerPage;
  const currentPageCareWorkers = filteredCareWorkers.slice(
    indexOfFirstCareworker,
    indexOfLastCareworker
  );
  const maxPageNumber = Math.ceil(filteredCareWorkers.length / careWorkersPerPage);

  const getPaginationBarNumbers = useCallback(() => {
    return range(
      currentPaginationGroup * PAGINATION_LENGTH + 1,
      Math.min((currentPaginationGroup + 1) * PAGINATION_LENGTH, maxPageNumber)
    );
  }, [currentPaginationGroup, maxPageNumber]);

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
    setSelectedConsonantFilter(-1);
    setSchedules([CareWorkerSchedule.noArgsConstructor()]);
    setSelectedCareInfo([] as string[]);
    setSelectedReligion([] as string[]);
    setFilteredCareWorkers(careWorkers);
  }, [careWorkers]);

  const handleSearchOnClickSearchButton = () => {};

  useEffect(() => {
    (async () => {
      if (!careCenter.isLoggedIn) return;
      try {
        const response = await axios.get(
          `/outer-care-worker/search?from=${0}&size=${careWorkersPerPage}`
        );
        setCareWorkers(response.data.data);
      } catch (e) {
        return;
      }
    })();
  }, [careCenter]);

  const filterNameByLetter = (cws: CareWorker[]) => {
    if (selectedConsonantFilter === -1) return cws;
    const result = cws.filter(
      (cw: CareWorker) =>
        cw.name[0].charCodeAt(0) >= KOREAN_ASCII_LIST[selectedConsonantFilter][0].charCodeAt(0) &&
        cw.name[0].charCodeAt(0) <= KOREAN_ASCII_LIST[selectedConsonantFilter][1].charCodeAt(0)
    );
    return result;
  };

  useEffect(() => {
    setFilteredCareWorkers(filterNameByLetter(careWorkers));
  }, [careWorkers]);

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
    selectedCareInfo,
    toggleReligion,
    selectedReligion,
    handleReset,
    handleSearchOnClickSearchButton,
    careCenter,
    careWorkersPerPage,
    setCareWorkersPerPage,
    setCurrentPage,
    setCurrentPaginationGroup,
    selectedConsonantFilter,
    setSelectedConsonantFilter,
    currentPage,
    currentPaginationGroup,
    getPaginationBarNumbers,
    currentPageCareWorkers,
    maxPageNumber,
  };
};
