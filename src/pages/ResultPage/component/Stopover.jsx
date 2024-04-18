import React from "react";
import "./Stopover.css";
import { useStationReqreQuery } from "../../../hooks/useStationReqre";

const Stopover = ({ depart, arrive }) => {
    // 전체 역 가져오기 >> 따로 각각의 정보를 추출할수있는 값X >> 인덱스 값 활용 필요
    const { data, error, isLoading } = useStationReqreQuery({
        startIdx: 0,
        endIdx: 278,
    });

    console.log(data);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류가 발생했습니다: {error.message}</div>;
    }

    // 역이름을 인덱스로 변환
    const startIdx = data.findIndex((station) => station.STATN_NM === depart);
    const endIdx = data.findIndex((station) => station.STATN_NM === arrive);

    // 다시다시다시다시-----------------

    // 경유지 정보 추출
    let stopovers = [];
    if (startIdx < endIdx) {
        stopovers = data.slice(startIdx + 1, endIdx);
    } else if (startIdx > endIdx) {
        stopovers = data.slice(endIdx + 1, startIdx).reverse();
    }

    // 모든 경유지가 같은 호선에 속하는지 확인
    const sameLine = stopovers.every((station, idx, arr) => {
        // 첫 번째 역의 호선 정보를 기준으로 모든 역의 호선 정보가 동일한지 검사
        const firstLine = arr[0]?.LINE;
        return station.LINE === firstLine;
    });

    if (!sameLine) {
        return <p>경유역 정보를 찾을 수 없습니다.</p>;
    }

    // 경유역 정보를 표시
    return (
        <div className="stopover">
            <h1>역 경유 정보</h1>
            <h2>{depart} 출발</h2>
            {stopovers.length > 0 ? (
                stopovers.map((station, idx) => (
                    <div key={idx}>
                        <h3>{station.STATN_NM}</h3>
                        <p>{station.LINE} 호선</p>
                        {/* 환승 가능한 호선을 표시 */}
                        {station.transfers && (
                            <p>
                                환승 가능한 호선: {station.transfers.join(", ")}
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p>경유역 정보를 찾을 수 없습니다.</p>
            )}
            <h2>{arrive} 도착</h2>
        </div>
    );
};

export default Stopover;
