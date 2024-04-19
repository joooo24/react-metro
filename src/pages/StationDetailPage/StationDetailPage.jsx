import React from "react";
import { useSearchParams } from "react-router-dom";

import StationAddressInfo from "./component/StationAddressInfo/StationAddressInfo";
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
                <ul className="arr-start-end">
                    <li>
                        <span className="tit">첫차</span>
                        <span className="time">04:00</span>
                    </li>
                    <li>
                        <span className="tit">막차</span>
                        <span className="time">04:00</span>
                    </li>
                </ul>
                <button className="btn-show-station">지하철 노선도 보기</button>
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
                <StationAddressInfo currentStation={currentStation} />
            </div>
        </div>
    );
};

export default StationDetailPage;
