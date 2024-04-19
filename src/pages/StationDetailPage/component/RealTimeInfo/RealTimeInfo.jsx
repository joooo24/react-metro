import React from "react";

const RealTimeInfo = ({ currentStation }) => {
    return (
        <ul className="arr-real-time">
            <li>
                <span className="tit">당 역</span>
                <span className="station">{currentStation}</span>
                <span className="status">도착</span>
            </li>
            <li>
                <span className="tit">전 역</span>
                <span className="station">강남역</span>
                <span className="status">도착</span>
            </li>
            <li>
                <span className="tit">n역 전</span>
                <span className="station">강남역</span>
                <span className="status">접근</span>
            </li>
        </ul>
    );
};

export default RealTimeInfo;
