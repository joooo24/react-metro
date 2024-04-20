import React, { useState, useEffect } from "react";
import { useRealtimePositionQuery } from "../../../../hooks/useRealtimePosition";
import { useStationInfoQuery } from "../../../../hooks/useStationInfo";


const StationList = ({realtimeStation}) => {
    //console.log(realtimeStation)
    
    return (
        <div className="station-list">
            <div className="station-name">{realtimeStation?.statnFid}</div>
            <div className="station-name">{realtimeStation?.statnNm}</div>
            <div className="station-name">{realtimeStation?.statnTid}</div>
        </div>
    );
};

export default StationList;
