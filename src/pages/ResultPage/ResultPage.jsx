import { useState, useEffect } from "react";
import "./ResultPage.css";
import { useSearchParams } from "react-router-dom";
import RequiredTime from "./component/RequiredTime/RequiredTime";
import KakaoMap from '../../common/KakaoMap/KakaoMap'
import axios from "axios";
import DepartureArrivalTime from "./component/DepartureArrivalTime/DepartureArrivalTime";
import { useStationPositionQuery } from "../../hooks/useStationPosition";
import { useRealtimePositionQuery } from '../../hooks/useRealtimePosition'
import { calTime } from "../../utils/calTime";
import ReportForm from "./component/ReportForm/ReportForm";

const startIdx = 0
const endIdx = 50

const ResultPage = () => {
    const [query, setQuery] = useSearchParams()
    const departStatnNm = query.get("depart").replace(/역$/, '');
    const arriveStatnNm = query.get("arrive").replace(/역$/, '');
    const departLine = query.get("departLine").replace(/호선$/, '');
    const arriveLine = query.get("arriveLine").replace(/호선$/, '');

    const [statnLat, setStatnLat] = useState()
    const [statnLng, setStatnLng] = useState()
    const [departTime, setDepartTime] = useState("")
    const [showReport, isShowReport] = useState(false)

    const { data: statnPosDB } = useStationPositionQuery()
    //실시간 도착 
    const { data: ArrivalList, isLoading, isError, error } =
        useRealtimePositionQuery({ startIdx, endIdx, statnNm: departStatnNm })

    console.log("실시간 도착", ArrivalList)

    useEffect(() => {
        const statnPosition = statnPosDB?.find(station => station.StatnNm === departStatnNm)
        setStatnLat(statnPosition?.lat)
        setStatnLng(statnPosition?.lng)
        if (statnPosition) {
            setDepartTime(FindDepartTime(ArrivalList))
        }
    }, [statnPosDB])

    const FindDepartTime = (ArrivalList) => {
        let recptnDt = new Date(ArrivalList[0]?.recptnDt)
        let barvlDt = parseInt(ArrivalList[0]?.barvlDt)
        let result = calTime(recptnDt, barvlDt)
        console.log("출발시간 결과 : ", result)
        return result
    }

    const handleShowReport = () => {
        isShowReport(!showReport)
    }

    return (
        <div className="station-result-page">
            <div className="result-map-wrap">
                <KakaoMap statnLat={statnLat} statnLng={statnLng} />
            </div>
            <div className="navigate-result-information">
                <RequiredTime />
                <DepartureArrivalTime departTime={departTime} />
                <div>
                    경유지
                </div>
                <div onClick={() => handleShowReport()}> --잘못된 정보 신고-- </div>
            </div>
            <div className={`report-form-wrap ${showReport ? "visible" : ""}`}>
                <div className="report-form-content">
                    <ReportForm />
                    <div onClick={handleShowReport}>--되돌아가기--</div>
                </div>
            </div>
        </div>
    )
};

export default ResultPage;
