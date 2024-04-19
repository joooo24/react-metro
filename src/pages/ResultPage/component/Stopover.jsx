import React, { useState } from "react";
import "./Stopover.css";
import { useStationReqreAllQuery } from "../../../hooks/useStationReqreAll";
import { useNavigate } from "react-router-dom";

const Stopover = ({ depart, arrive, departLine, arriveLine }) => {
    // 경유지 토글 버튼 >> 진행예정
    const [showStopover, setShowStopover] = useState(false);
    const isToggleOpen = () => {
        setShowStopover((prev) => !prev);
    };

    // 역 상세 페이지 이동
    const navigate = useNavigate();
    const goToDetailStation = (stationNM) => {
        navigate(`/station-detail?q=${stationNM}`);
    };

    // 전체 역 가져오기
    const { data, error, isLoading } = useStationReqreAllQuery({
        startIdx: 0,
        endIdx: 278,
    });

    // console.log(departLine, arriveLine);
    // console.log(data);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }
    if (error) {
        return <div>오류 : {error.message}</div>;
    }

    // 역 이름 및 호선에 따라 데이터 필터링
    const stationsByName = data.reduce((acc, station) => {
        acc[station.STATN_NM] = acc[station.STATN_NM] || [];
        acc[station.STATN_NM].push(station);
        return acc;
    }, {});

    // 출발 역과 도착 역 사이의 경유지 계산
    const findStopovers = (startStation, endStation, line) => {
        const startIndex = data.findIndex(
            (station) =>
                station.STATN_NM === startStation && station.LINE === line
        );
        const endIndex = data.findIndex(
            (station) =>
                station.STATN_NM === endStation && station.LINE === line
        );

        if (startIndex === -1 || endIndex === -1) {
            return [];
        }

        if (startIndex < endIndex) {
            return data.slice(startIndex + 1, endIndex);
        } else {
            return data.slice(endIndex + 1, startIndex).reverse();
        }
    };

    // 같은 호선끼리 경유지 찾기
    let stopovers1 = [];
    let stopovers2 = [];

    if (departLine === arriveLine) {
        // 같은 호선에서 출발하고 도착하는 경우 경유지 찾기
        stopovers1 = findStopovers(depart, arrive, departLine);
    } else {
        // 다른 호선에서 출발하고 도착하는 경우
        const findTransferStation = (stations, startLine, endLine) => {
            let transferStation = null;
            // 출발 호선과 일치하는 역을 순회
            stations.forEach((station) => {
                if (station.LINE === startLine && !transferStation) {
                    const currentStation = station.STATN_NM;
                    const nextStations = stationsByName[currentStation];
                    // 현재 역에서 도착 호선과 일치하는 환승역을 찾음
                    nextStations.forEach((nextStation) => {
                        if (nextStation.LINE === endLine && !transferStation) {
                            transferStation = currentStation;
                        }
                    });
                }
            });
            return transferStation;
        };

        // 호선 번호를 활용하여 환승역을 찾음
        const transferStation = findTransferStation(
            data,
            departLine,
            arriveLine
        );

        stopovers1 = findStopovers(
            depart,
            transferStation || arrive,
            departLine
        );
        stopovers2 = transferStation
            ? findStopovers(transferStation, arrive, arriveLine)
            : [];
    }

    // 호선 번호에 따라 클래스 이름 할당
    const getLineClass = (lineNumber) => {
        return `line-${lineNumber}`;
    };

    // 경유지 정보 표시
    return (
        <div className="stopover-wrapper">
            {/* 출발역 정보 */}
            <div
                className={`stopover-start-station ${getLineClass(departLine)}`}
            >
                <p>03:46</p>
                <h2>{departLine}</h2>
                <h3 onClick={() => goToDetailStation(depart)}>{depart}역</h3>
            </div>
            <div>
                {/* 환승역 정보 */}
                {stopovers1.length > 0 && stopovers2.length > 0 ? (
                    <div className="transfer-station">
                        <h3>
                            환승역 :{" "}
                            <b className={getLineClass(departLine)}>
                                {stopovers1[stopovers1.length - 1].STATN_NM}
                            </b>{" "}
                            환승호선 :{" "}
                            <b className={getLineClass(arriveLine)}>
                                {stopovers2[0].LINE}호선
                            </b>
                        </h3>
                    </div>
                ) : null}
            </div>
            <div className="stopover-over-station">
                {/* 경유역 정보 */}
                <span></span>
                <span>
                    {stopovers1.map((station, idx) => (
                        <div
                            className={`over-station-first ${getLineClass(
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
                            <p>{station.MNT}분</p>
                        </div>
                    ))}
                    {/* 환승역 정보 추가 */}
                    {stopovers1.length > 0 && stopovers2.length > 0 && (
                        <div className="transfer-station">
                            <h3>
                                <b className={getLineClass(departLine)}>
                                    {stopovers1[stopovers1.length - 1].STATN_NM}
                                </b>
                                에서 하차하여{" "}
                                <b className={getLineClass(arriveLine)}>
                                    {stopovers2[0].LINE}호선
                                </b>
                                으로 환승하십시오.
                            </h3>
                        </div>
                    )}
                    {stopovers2.length === 0 &&
                        (stopovers1.length > 0 &&
                        stopovers2.length === 0 ? null : (
                            <p>경유지 정보를 가져올 수 없습니다.</p>
                        ))}
                    {stopovers2.map((station, idx) => (
                        <div
                            className={`over-station-second ${getLineClass(
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
                            <p>{station.LINE}호선</p>
                            <p>{station.MNT}분</p>
                        </div>
                    ))}
                </span>
            </div>
            {/* 도착역 정보 */}
            <div className={`stopover-end-station ${getLineClass(arriveLine)}`}>
                <p>03:54</p>
                <h2>{arriveLine}</h2>
                <h3 onClick={() => goToDetailStation(arrive)}>{arrive}역</h3>
            </div>
        </div>
    );
};

export default Stopover;
