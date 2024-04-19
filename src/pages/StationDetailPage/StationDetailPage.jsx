import React from "react";
import { useSearchParams } from "react-router-dom";
import StationAddressInfo from "./component/StationAddressInfo/StationAddressInfo";
import ArrivalInfo from "./component/ArrivalInfo/ArrivalInfo";
import RealTimeInfo from "./component/RealTimeInfo/RealTimeInfo";
import StationList from "./component/StationList/StationList";
import "./StationDetailPage.css";

const StationDetailPage = () => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams();
    const currentStation = query.get("q");

    return (
        <div className="station-detail-page">
            <div className="map-wrap">지도</div>
            <div className="station-information">
                {/* 역 리스트 */}
                <StationList currentStation={currentStation} />

                {/* 도착정보 */}
                <ArrivalInfo currentStation={currentStation} />

                <button className="btn-show-station">지하철 노선도 보기</button>

                {/* 실시간 도착정보 */}
                <RealTimeInfo currentStation={currentStation} />

                {/* 역 주소 */}
                <StationAddressInfo currentStation={currentStation} />
            </div>
        </div>
    );
};

export default StationDetailPage;
