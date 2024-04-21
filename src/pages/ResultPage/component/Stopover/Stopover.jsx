import React, { useState } from "react";
import "./Stopover.css";
import { Link, useNavigate } from "react-router-dom";
import ReportForm from "../ReportForm/ReportForm";

const Stopover = ({
    depart,
    arrive,
    departLine,
    arriveLine,
    allStopList,
    updatedStopTimeList,
}) => {
    const [transferStation, setTransferStation] = useState(null);
    const [stopoverStations, setStopoverStations] = useState([]);
    const navigate = useNavigate();

    console.log(
        depart,
        arrive,
        departLine,
        arriveLine,
        allStopList,
        updatedStopTimeList
    );

    const goToDetailStation = (stationNM) => {
        navigate(`/station-detail?q=${stationNM}`);
    };

    const showForm = () => {
        // navigate("/incorrectInfo");
    };

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
                    {allStopList && allStopList.length > 0 ? (
                        allStopList.slice(1, -1).map((station, idx) => (
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
                                <h2>{station.MNT}</h2>
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
            <div className="stopover-form-button">
                <p onClick={showForm}>-잘못된 정보 신고-</p>
            </div>
        </div>
    );
};

export default Stopover;

// ---------------- 이전 작업 ------------------------
// import React, { useState, useEffect } from "react";
// import "./Stopover.css";
// import { useStationReqreAllQuery } from "../../../../hooks/useStationReqreAll";
// import { useNavigate } from "react-router-dom";

// const Stopover = ({ depart, arrive, departLine, arriveLine }) => {
//     const navigate = useNavigate();
//     const { data, error, isLoading } = useStationReqreAllQuery({
//         startIdx: 0,
//         endIdx: 278,
//     });

//     console.log(data);

//     const [transferStation, setTransferStation] = useState(null);
//     const [stopoverStations, setStopoverStations] = useState([]);

//     const goToDetailStation = (stationNM) => {
//         navigate(`/station-detail?q=${stationNM}`);
//     };

//     useEffect(() => {
//         if (!data) return; // 데이터가 없는 경우 빠르게 리턴

//         const stationsByName = data.reduce((acc, station) => {
//             acc[station.STATN_NM] = acc[station.STATN_NM] || [];
//             acc[station.STATN_NM].push(station);
//             return acc;
//         }, {});

//         const findTransferStation = () => {
//             const transferStation = data.find((station) => {
//                 return (
//                     station.LINE === departLine.substring(1) &&
//                     stationsByName[station.STATN_NM] &&
//                     stationsByName[station.STATN_NM].some(
//                         (s) => s.LINE === arriveLine.substring(1)
//                     )
//                 );
//             });
//             return transferStation ? transferStation.STATN_NM : null;
//         };

//         const findStopoverStations = () => {
//             const startIndex = data.findIndex(
//                 (station) =>
//                     station.STATN_NM === depart &&
//                     station.LINE === departLine.substring(1)
//             );
//             const endIndex = data.findIndex(
//                 (station) =>
//                     station.STATN_NM === arrive &&
//                     station.LINE === arriveLine.substring(1)
//             );

//             if (startIndex === -1 || endIndex === -1) {
//                 return [];
//             }

//             if (startIndex < endIndex) {
//                 return data.slice(startIndex + 1, endIndex);
//             } else {
//                 return data.slice(endIndex + 1, startIndex).reverse();
//             }
//         };

//         setTransferStation(findTransferStation());
//         setStopoverStations(findStopoverStations());
//     }, [data, depart, departLine, arrive, arriveLine]);

//     if (isLoading) {
//         return <div>로딩 중...</div>;
//     }

//     if (error) {
//         return <div>오류 : {error.message}</div>;
//     }

//     const getLineClass = (lineNumber) => {
//         return `line-${lineNumber.substring(1)}`;
//     };

//     return (
//         <div className="stopover-wrapper">
//             {/* 출발역 정보 */}
//             <div
//                 className={`stopover-start-station ${getLineClass(departLine)}`}
//             >
//                 <p>출발</p>
//                 <h2>{departLine.substring(1)}</h2>
//                 <h3 onClick={() => goToDetailStation(depart)}>{depart}역</h3>
//             </div>
//             {transferStation && (
//                 <>
//                     {/* 환승역이 있는 경우 */}
//                     {departLine === arriveLine ? (
//                         // 환승역이 출발역과 도착역이 같은 경우
//                         <div className="stopover-over-station">
//                             <span></span>
//                             <span>
//                                 {stopoverStations.length > 0 ? (
//                                     stopoverStations.map((station, idx) => (
//                                         <div
//                                             className={`over-station ${getLineClass(
//                                                 station.LINE
//                                             )}`}
//                                             key={idx}
//                                         >
//                                             <h3
//                                                 onClick={() =>
//                                                     goToDetailStation(
//                                                         station.STATN_NM
//                                                     )
//                                                 }
//                                             >
//                                                 {station.STATN_NM}
//                                             </h3>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div>
//                                         경유지 정보를 가져올 수 없습니다..
//                                     </div>
//                                 )}
//                             </span>
//                         </div>
//                     ) : (
//                         // 환승역이 출발역과 도착역이 다른 경우
//                         <div className="stopover-trans-station">
//                             <div className="transfer-station">
//                                 <h3>
//                                     환승역 :{" "}
//                                     <b className={getLineClass(departLine)}>
//                                         {transferStation}
//                                     </b>{" "}
//                                     환승호선 :{" "}
//                                     <b className={getLineClass(arriveLine)}>
//                                         {arriveLine.substring(1)}호선
//                                     </b>
//                                 </h3>
//                             </div>
//                             <p>경유지 정보 업데이트 중입니다.</p>
//                         </div>
//                     )}
//                 </>
//             )}

//             {/* 도착역 정보 */}
//             <div className={`stopover-end-station ${getLineClass(arriveLine)}`}>
//                 <p>도착</p>
//                 <h2>{arriveLine.substring(1)}</h2>
//                 <h3 onClick={() => goToDetailStation(arrive)}>{arrive}역</h3>
//             </div>
//         </div>
//     );
// };

// export default Stopover;
