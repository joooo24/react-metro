import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import './FullTimetable.css';
import { Alert } from "react-bootstrap";
import { useStationFullTimeQuery } from '../../../../hooks/useStationFullTIme';
import { useSearchParams } from 'react-router-dom';
import { useStationNameInfoQuery } from '../../../../hooks/useStationNameInfo';
import { MdNavigateBefore } from "react-icons/md";

const FullTimetable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [week, setWeek] = useState(getWeekValue());

  const [query, setQuery] = useSearchParams();
  const queryValue = query.get('q');
  const exceptStation = queryValue.replace(/역$/, '');

  const { data: stationName } = useStationNameInfoQuery({ startIdx: 1, endIdx: 800 });

  
  // FR_CODE 100~900 배열
  const selectedStations = [];
  stationName?.forEach((station) => {
    const frCode = parseInt(station.FR_CODE);
    if (frCode >= 100 && frCode <= 900) {
      selectedStations?.push(station);
    }
  });
  // console.log(selectedStations);

  const stationId = selectedStations?.filter((item) => queryValue && exceptStation === item.STATION_NM).map((item) => item.STATION_CD);
  // console.log('station', stationId);

  const { data: fullTimeData1, isLoading1, isError1, error1 } = useStationFullTimeQuery({ startIdx: 1, endIdx: 500, stationCd: stationId?.[0] || stationId?.[1], week: week, inout: 1 });
  const { data: fullTimeData2 } = useStationFullTimeQuery({ startIdx: 1, endIdx: 500, stationCd: stationId?.[0] || stationId?.[1], week: week, inout: 2 });
  // console.log('fullTimedata1-->', fullTimeData1);
  // console.log('fullTimedata2-->', fullTimeData2);


  //오늘 날짜 -> 요일 -> week값
  function getToday() {
    return new Date();
  }

  function getDayOfWeek() {
    const today = getToday();
    return today.getDay();
  }

  function getWeekValue() {
    const dayOfWeek = getDayOfWeek();
    switch (dayOfWeek) {
      case 1: // 월요일
      case 2: // 화요일
      case 3: // 수요일
      case 4: // 목요일
      case 5: // 금요일
        return 1; // 평일
      case 6: // 토요일
        return 2; // 토요일
      default:
        return 3; // 공휴일
    }
  }

  function handleWeekChange(weekValue) {
    setWeek(weekValue);
  }

  if (isLoading1) {
    return <div>정보를 받아오는 중입니다</div>;
  }

  if (isError1) {
    return <Alert variant='danger'>{error1.message}</Alert>;
  }

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>전체 시간표 보기</button>
      {modalOpen && (
        <div
          className='modal-container'
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className='content'>
            <button
              className='modal-close-btn'
              onClick={() => setModalOpen(false)}
            >
              <MdNavigateBefore />
            </button>
            {fullTimeData1 &&
            fullTimeData1[0] &&
            fullTimeData1[0].STATION_NM ? (
              <>
                <div className='full-timetable-title'>
                  {fullTimeData1[0].STATION_NM}역 {fullTimeData1[0].LINE_NUM}
                </div>
                <div className='full-timetable-date'>
                  <button onClick={() => handleWeekChange(1)}>평일</button>
                  <button onClick={() => handleWeekChange(2)}>토요일</button>
                  <button onClick={() => handleWeekChange(3)}>공휴일</button>
                </div>
                <table className='full-timetable'>
                  <thead>
                    <tr>
                      <th>{fullTimeData1[0].SUBWAYSNAME} 방향</th>
                      <th>{fullTimeData2[0].SUBWAYSNAME} 방향</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fullTimeData1 &&
                      fullTimeData1.map((item, index) => (
                        <tr key={index}>
                          <td>{item.ARRIVETIME.slice(0, 5)}</td>
                          <td>
                            {fullTimeData2 &&
                              fullTimeData2[index]?.ARRIVETIME?.slice(0, 5)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className='loading'>
                <div>현재 준비중입니다.</div>
                <div>불편을 끼쳐드려서 죄송합니다.</div>
                <div>
                  빠른 시일 내에 원활하게 서비스 이용 가능하도록 하겠습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FullTimetable