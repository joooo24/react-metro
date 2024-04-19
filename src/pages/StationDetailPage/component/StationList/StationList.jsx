import React,{useEffect} from "react";
import { useRealtimePositionQuery } from "../../../../hooks/useRealtimePosition";


const StationList = ({ currentStation }) => {
    console.log(currentStation); // 강남역
    const { data: stationPosition, isLoading, isError, error } = useRealtimePositionQuery({
        startIdx: 1,
        endIdx: 50,
        statnNm: currentStation // 현재 역을 subwayNm에 넣기
    });
    console.log(stationPosition?.statnNm);
   
    return (
        <div className="station-list">
            <div className="station-name">역 이름</div>
            <div className="station-name">{currentStation}</div>
            <div className="station-name">역 이름</div>
        </div>
    );
};

export default StationList;
