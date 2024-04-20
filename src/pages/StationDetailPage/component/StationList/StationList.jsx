import React, { useState, useEffect } from "react";
import { useRealtimePositionQuery } from "../../../../hooks/useRealtimePosition";


const StationList = ({ currentStation }) => {

    const [realtimeStation, setRealtimeStation]= useState();

    const { data:stationPosition, isLoading, isError, error } = useRealtimePositionQuery({
        startIdx: 0,
        endIdx: 50,
        statnNm: currentStation 
    });

    const RealtimeStationPostion = (currentStation)=>{
        if(Array.isArray(stationPosition)){
            const findStation = stationPosition.find(
                (station) => station.statnNm === currentStation
            );
            setRealtimeStation(findStation || {});
        }
    }
    useEffect(() => {
        RealtimeStationPostion();
    }, [stationPosition]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    console.log(realtimeStation)
    return (
        <div className="station-list">
            <div className="station-name">역 이름</div>
            <div className="station-name">{currentStation}</div>
            <div className="station-name">역 이름</div>
        </div>
    );
};

export default StationList;
