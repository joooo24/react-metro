import { useState, useEffect } from "react";
import "./ResultPage.css";
import { useSearchParams } from "react-router-dom";
import RequiredTime from "./component/RequiredTime/RequiredTime";
import KakaoMap from "../../common/KakaoMap/KakaoMap";
import axios from "axios";
import DepartureArrivalTime from "./component/DepartureArrivalTime/DepartureArrivalTime";
import { useStationPositionQuery } from "../../hooks/useStationPosition";
import { useRealtimePositionQuery } from "../../hooks/useRealtimePosition";
import { calTime, calculateTimes } from "../../utils/time/calTime";
import ReportForm from "./component/ReportForm/ReportForm";
import { useStationReqreTimeQuery } from "../../hooks/useStationReqreTime";
import { timeToMinutes } from "../../utils/time/timeToMinutes";
import { addMinutes } from "../../utils/time/addMinutes";
import Stopover from "../../pages/ResultPage/component/Stopover/Stopover";

const startIdx = 0;
const endIdx = 80;

const ResultPage = () => {
    let departToStopList = [];
    let stopToArriveList = [];
    let stopStatn;
    let allStopList;
    let totalMinutes;
    let ResultTotalMinutes;
    let ResultArrivalTime;
    let minutesOnlyList;
    // 경유지 각각 도착 시간
    let updatedStopTimeList;

    const [resultTotalMinutes, setResultTotalMinutes] = useState(0);
    const [resultDepartTime, setResultDepartTime] = useState("");
    const [resultArrivalTime, setResultArrivalTime] = useState("");
    const [query, setQuery] = useSearchParams();
    const departStatnNm = query.get("depart").replace(/역$/, "");
    const arriveStatnNm = query.get("arrive").replace(/역$/, "");
    const departLine = query.get("departLine").replace(/^0+|호선$/g, "");
    const arriveLine = query.get("arriveLine").replace(/^0+|호선$/g, "");

    // console.log("arriveLine", arriveLine)

    const [statnLat, setStatnLat] = useState();
    const [statnLng, setStatnLng] = useState();
    const [showReport, isShowReport] = useState(false);

    const {
        data: statnPosDB,
        isLoading: DBisLoading,
        isError: DBisError,
        error: DBerror,
    } = useStationPositionQuery();
    //실시간 도착
    const {
        data: ArrivalList,
        isLoading,
        isError,
        error,
    } = useRealtimePositionQuery({ startIdx, endIdx, statnNm: departStatnNm });
    console.log("arivalList", ArrivalList);
    //역간 거리정보 (출발호선, 도착호선)
    const { data: departLineStatnList } = useStationReqreTimeQuery({ startIdx, endIdx, lineNm: departLine })
    const { data: arriveLineStatnList } = useStationReqreTimeQuery({ startIdx, endIdx, lineNm: arriveLine })
    console.log("ddd", departLineStatnList)
    console.log("aaa", arriveLine, arriveLineStatnList)

    if (departLine == arriveLine && statnPosDB) {
        let startIndex = departLineStatnList?.findIndex((station) =>
            station.STATN_NM.includes(departStatnNm)
        );
        let arriveIndex = departLineStatnList?.findIndex((station) =>
            station.STATN_NM.includes(arriveStatnNm)
        );

        if (startIndex >= 0 && arriveIndex >= 0 && startIndex <= arriveIndex) {
            allStopList = departLineStatnList?.slice(
                startIndex,
                arriveIndex + 1
            );
        } else if (
            startIndex >= 0 &&
            arriveIndex >= 0 &&
            startIndex > arriveIndex
        ) {
            [startIndex, arriveIndex] = [arriveIndex, startIndex];
            allStopList = departLineStatnList
                ?.slice(startIndex, arriveIndex + 1)
                .reverse();
        }
    }

    if (departLine != arriveLine && statnPosDB) {
        const departStopList = departLineStatnList?.map(
            (station) => station.STATN_NM
        );
        console.log("departStopList", departStopList);
        let ResultStatn;
        for (let i = 0; i < departStopList?.length; i++) {
            let findStatnName = departStopList[i];
            let findLineName = arriveLine;
            ResultStatn = statnPosDB.find(
                (station) =>
                    station?.StatnNm == findStatnName &&
                    station.LineNm == findLineName
            );
            if (ResultStatn) {
                // console.log("찾았다", ResultStatn)
                break;
            }
        }
        stopStatn = ResultStatn;
        console.log("환승역", stopStatn);
        //인덱스 찾기 -> slice()로 범위 추출하기
        // console.log(departStatnNm, stopStatn?.StatnNm)
        let startIndex = departLineStatnList?.findIndex((station) =>
            station.STATN_NM.includes(departStatnNm)
        );
        let stopIndex = departLineStatnList?.findIndex(
            (station) => station.STATN_NM == stopStatn?.StatnNm
        );
        console.log("출발, 정차", startIndex, stopIndex);
        if (startIndex >= 0 && stopIndex >= 0 && startIndex <= stopIndex) {
            departToStopList = departLineStatnList?.slice(
                startIndex,
                stopIndex + 1
            );
        } else if (
            startIndex >= 0 &&
            stopIndex >= 0 &&
            startIndex > stopIndex
        ) {
            [startIndex, stopIndex] = [stopIndex, startIndex];
            departToStopList = departLineStatnList
                ?.slice(startIndex, stopIndex + 1)
                .reverse();
        }

        let stopIndex2 = arriveLineStatnList?.findIndex(
            (station) => station.STATN_NM == stopStatn.StatnNm
        );
        let arriveIndex = arriveLineStatnList?.findIndex((station) =>
            station.STATN_NM.includes(arriveStatnNm)
        );
        console.log("정차2, 도착", stopIndex2, arriveIndex);
        if (stopIndex2 >= 0 && arriveIndex >= 0 && stopIndex2 <= arriveIndex) {
            stopToArriveList = arriveLineStatnList?.slice(
                stopIndex2,
                arriveIndex
            );
        }
        //index 값 조정
        else if (
            stopIndex2 >= 0 &&
            arriveIndex >= 0 &&
            stopIndex2 > arriveIndex
        ) {
            [stopIndex2, arriveIndex] = [arriveIndex, stopIndex2];
            stopToArriveList = arriveLineStatnList
                ?.slice(stopIndex2, arriveIndex)
                .reverse();
        }
        allStopList = [...departToStopList, ...stopToArriveList];
    }

    console.log("경유지 리스트", allStopList);
    if (allStopList) {
        totalMinutes = allStopList?.reduce((acc, station) => {
            return acc + timeToMinutes(station?.MNT);
        }, 0);

        //출발지점 역 시간 제외
        totalMinutes = totalMinutes - timeToMinutes(allStopList[0]?.MNT);

        ResultTotalMinutes = Math.ceil(totalMinutes / 60);
        ResultArrivalTime = addMinutes(resultDepartTime, ResultTotalMinutes);
    }

    // console.log("소요시간")
    // console.log("실시간 도착", ArrivalList)

    useEffect(() => {
        const statnPosition = statnPosDB?.find(
            (station) => station.StatnNm === departStatnNm
        );
        setStatnLat(statnPosition?.lat);
        setStatnLng(statnPosition?.lng);
    }, [statnPosDB]);

    useEffect(() => {
        setResultTotalMinutes(ResultTotalMinutes);
        // setResultArrivalTime(ResultArrivalTime)
    }, [ResultTotalMinutes]);

    // 출발 시간 계산
    useEffect(() => {
        if (statnPosDB && ArrivalList) {
            const FindDepartTime = async () => {
                let recptnDt = new Date(ArrivalList[0]?.recptnDt);
                let barvlDt = parseInt(ArrivalList[0]?.barvlDt);
                let result = await calTime(recptnDt, barvlDt); // calTime가 비동기 함수라면 await 사용
                return result;
            };

            FindDepartTime().then((departTime) => {
                if (departTime) {
                    setResultDepartTime(departTime);
                }
            });
        }
    }, [statnPosDB, ArrivalList]);

    // 도착 시간 계산 및 업데이트
    useEffect(() => {
        if (resultDepartTime && !isNaN(resultTotalMinutes)) {
            const arrivalTime = addMinutes(
                resultDepartTime,
                resultTotalMinutes
            );
            setResultArrivalTime(arrivalTime);
        }
    }, [resultDepartTime, resultTotalMinutes]);

    // 출발역 출발시간 업데이트 후, reduce로 누적
    if (allStopList) {
        minutesOnlyList = allStopList.map((station) => {
            // MNT 값에서 ':'를 기준으로 분할하고 첫 번째 요소(분)를 반환
            return station.MNT.split(":")[0];
        });

        updatedStopTimeList = calculateTimes(resultDepartTime, minutesOnlyList);

        console.log(updatedStopTimeList);
    }

    const handleShowReport = () => {
        isShowReport(!showReport);
    };

    if (isLoading && DBisLoading) {
        return <h1>is Loading</h1>;
    }
    if (isError && DBisError) {
        return (
            <div>
                {error.message}
                {DBerror.message}
            </div>
        );
    }

    return (
        <div className="station-result-page">
            <div className="result-map-wrap">
                <KakaoMap statnLat={statnLat} statnLng={statnLng} />
            </div>
            <div className="navigate-result-information">
                <RequiredTime totalMinutes={ResultTotalMinutes} />
                <DepartureArrivalTime
                    departTime={resultDepartTime}
                    arriveTime={ResultArrivalTime}
                />
                <Stopover
                    depart={departStatnNm}
                    arrive={arriveStatnNm}
                    departLine={departLine}
                    arriveLine={arriveLine}
                    allStopList={allStopList}
                    updatedStopTimeList={updatedStopTimeList}
                />

                {/* <div onClick={() => handleShowReport()}>
                    {" "}
                    --잘못된 정보 신고--{" "}
                </div> */}
            </div>
            {/* <div className={`report-form-wrap ${showReport ? "visible" : ""}`}>
                <div className="report-form-content">
                    <ReportForm />
                    <div onClick={handleShowReport}>--되돌아가기--</div>
                </div>
            </div> */}
        </div>
    );
};

export default ResultPage;
