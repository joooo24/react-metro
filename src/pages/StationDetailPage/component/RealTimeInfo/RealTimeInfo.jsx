import React from "react";
//import { useRealtimetotalQuery } from "../../../../hooks/useRealtimePosition";

const RealTimeInfo = ({ realtimeStation }) => {
    console.log()

    return (
        <ul className="arr-real-time">
            <li>
                <span className="tit">{realtimeStation?.trainLineNm}</span>
                <span className="station">{realtimeStation?.arvlMsg3}</span>
                <span className="status">{realtimeStation?.arvlMsg2}</span>
            </li>
            <li>
                <span className="tit">{realtimeStation?.trainLineNm}</span>
                <span className="station">{realtimeStation?.arvlMsg3}</span>
                <span className="status">{realtimeStation?.arvlMsg2}</span>
            </li>
            <li>
                <span className="tit">{realtimeStation?.trainLineNm}</span>
                <span className="station">{realtimeStation?.arvlMsg3}</span>
                <span className="status">{realtimeStation?.arvlMsg2}</span>
            </li>
        </ul>
    );
};

export default RealTimeInfo;
