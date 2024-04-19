import React from "react";

const StationList = ({ currentStation }) => {
    return (
        <div className="station-list">
            <div className="station-name">역 이름</div>
            <div className="station-name">{currentStation}</div>
            <div className="station-name">역 이름</div>
        </div>
    );
};

export default StationList;
