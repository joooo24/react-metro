import React from "react";
import { useSearchParams } from "react-router-dom";
import StationAddressInfo from "./component/StationAddressInfo/StationAddressInfo";
import ArrivalInfo from "./component/ArrivalInfo/ArrivalInfo";
import RealTimeInfo from "./component/RealTimeInfo/RealTimeInfo";
import "./StationDetailPage.css";

const StationDetailPage = () => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams();
    const currentStation = query.get("q");

    return (
        <div className="station-detail-page">
            <div className="map-wrap">지도</div>
            <div className="station-information">
                <div className="station-list">
                    <div className="station-name">역 이름</div>
                    <div className="station-name">{currentStation}</div>
                </div>
                {/* 도착정보 */}
                <ArrivalInfo currentStation={currentStation} />
                <button className="btn-show-station">지하철 노선도 보기</button>
                {/* 실시간 도착정보 */}
                <RealTimeInfo currentStation={currentStation} />
                {/* 지하철 정보 */}
                <StationAddressInfo currentStation={currentStation} />
            </div>
        </div>
    );
};

export default StationDetailPage;
