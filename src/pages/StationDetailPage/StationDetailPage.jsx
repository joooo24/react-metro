import React from "react";
import "./StationDetailPage.css";

const StationDetailPage = () => {
    return (
        <div className="staion-detail-page">
            <div className="map-wrap">지도</div>
            <div className="station-infomation">
                <div className="station-list">
                    <div className="station-name">역 이름</div>
                    <div className="station-name">역 이름</div>
                    <div className="station-name">역 이름</div>
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
                        <span className="station">강남역</span>
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
                <div className="station-address">
                    <h4>주소</h4>
                    <p>서울시 강남구 테헤란로 지하 340</p>
                    <p>
                        <tel>02-6110-2201</tel> <b>대표번호</b>
                    </p>
                    <p>
                        <tel>02-6110-1122</tel> <b>유실물센터</b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StationDetailPage;
