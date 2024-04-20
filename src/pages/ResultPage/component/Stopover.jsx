import React, { useState, useEffect } from "react";
import "./Stopover.css";
import { useStationReqreAllQuery } from "../../../hooks/useStationReqreAll";
import { useNavigate } from "react-router-dom";

const Stopover = ({ depart, arrive, departLine, arriveLine }) => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useStationReqreAllQuery({
        startIdx: 0,
        endIdx: 278,
    });

    const [transferStation, setTransferStation] = useState(null);
    const [stopoverStations, setStopoverStations] = useState([]);

    const goToDetailStation = (stationNM) => {
        navigate(`/station-detail?q=${stationNM}`);
    };

    useEffect(() => {
        // 데이터가 있는 경우에만 실행
        if (data) {
            // 각 역을 이름으로 그룹화하여 객체로 만듭니다.
            const stationsByName = data.reduce((acc, station) => {
                acc[station.STATN_NM] = acc[station.STATN_NM] || [];
                acc[station.STATN_NM].push(station);
                return acc;
            }, {});

            // 환승역을 찾는 함수
            const findTransferStation = () => {
                const transferStation = data.find((station) => {
                    return (
                        station.LINE === departLine &&
                        stationsByName[station.STATN_NM] &&
                        stationsByName[station.STATN_NM].some(
                            (s) => s.LINE === arriveLine
                        )
                    );
                });
                return transferStation ? transferStation.STATN_NM : null;
            };

            // 경유지를 찾는 함수
            const findStopoverStations = () => {
                const startIndex = data.findIndex(
                    (station) =>
                        station.STATN_NM === depart &&
                        station.LINE === departLine
                );
                const endIndex = data.findIndex(
                    (station) =>
                        station.STATN_NM === arrive &&
                        station.LINE === arriveLine
                );

                if (startIndex === -1 || endIndex === -1) {
                    return [];
                }

                if (startIndex < endIndex) {
                    return data
                        .slice(startIndex + 1, endIndex)
                        .filter((station) => station.LINE === departLine); // 해당 호선의 역만 필터링
                } else {
                    return data
                        .slice(endIndex + 1, startIndex)
                        .reverse()
                        .filter((station) => station.LINE === departLine); // 해당 호선의 역만 필터링
                }
            };

            setTransferStation(findTransferStation());
            setStopoverStations(findStopoverStations());
        }
    }, [data, depart, departLine, arrive, arriveLine]);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류 : {error.message}</div>;
    }

    const getLineClass = (lineNumber) => {
        return `line-${lineNumber}`;
    };

    return (
        <div className="stopover-wrapper">
            {/* 출발역 정보 */}
            <div
                className={`stopover-start-station ${getLineClass(departLine)}`}
            >
                <p>출발</p>
                <h2>{departLine}</h2>
                <h3 onClick={() => goToDetailStation(depart)}>{depart}역</h3>
            </div>
            {/* 환승역 정보 */}
            {transferStation && departLine !== arriveLine && (
                <div className="transfer-station">
                    <h3>
                        <b className={getLineClass(departLine)}>
                            {transferStation}
                        </b>
                        에서{" "}
                        <b className={getLineClass(arriveLine)}>
                            {arriveLine}호선
                        </b>
                        으로 환승하세요.
                    </h3>
                </div>
            )}
            {/* 경유지 및 환승역 정보 */}
            <div className="stopover-over-station">
                <span></span>
                <span>
                    {stopoverStations.length > 0 ? (
                        stopoverStations.map((station, idx) => (
                            <div
                                className={`over-station ${getLineClass(
                                    station.LINE
                                )}`}
                                key={idx}
                            >
                                <h3
                                    onClick={() =>
                                        goToDetailStation(station.STATN_NM)
                                    }
                                >
                                    {station.STATN_NM}
                                </h3>
                            </div>
                        ))
                    ) : (
                        <p>경유지 정보를 가져올 수 없습니다.</p>
                    )}
                </span>
            </div>
            {/* 도착역 정보 */}
            <div className={`stopover-end-station ${getLineClass(arriveLine)}`}>
                <p>도착</p>
                <h2>{arriveLine}</h2>
                <h3 onClick={() => goToDetailStation(arrive)}>{arrive}역</h3>
            </div>
        </div>
    );
};

export default Stopover;
