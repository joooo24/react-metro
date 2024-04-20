import { useState, useEffect } from "react";
import "./ResultPage.css";
import { useSearchParams } from "react-router-dom";
import RequiredTime from "./component/RequiredTime/RequiredTime";
import KakaoMap from "../../common/KakaoMap/KakaoMap";
import axios from "axios";
import DepartureArrivalTime from "./component/DepartureArrivalTime/DepartureArrivalTime";
import { useStationPositionQuery } from "../../hooks/useStationPosition";
import { useRealtimePositionQuery } from '../../hooks/useRealtimePosition'
import { calTime } from "../../utils/calTime";
import ReportForm from "./component/ReportForm/ReportForm";
import { useStationReqreTimeQuery } from "../../hooks/useStationReqreTime";

const startIdx = 0
const endIdx = 50

const ResultPage = () => {

    let departToStopList = []
    let stopToArriveList = []
    let stopList = []
    let stopStatn

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
    //역간 거리정보 (출발호선, 도착호선)
    const { data: departLineStatnList } = useStationReqreTimeQuery({ startIdx, endIdx, lineNm: departLine })
    const { data: arriveLineStatnList } = useStationReqreTimeQuery({ startIdx, endIdx, lineNm: arriveLine })
    console.log("ddd", departLineStatnList)
    console.log("aaa", arriveLineStatnList)

    if (departLine != arriveLine && statnPosDB) {
        const departStopList = departLineStatnList?.map(station => station.STATN_NM)
        console.log("departStopList", departStopList)
        let ResultStatn
        for (let i = 0; i < departStopList?.length; i++) {
            let findStatnName = departStopList[i]
            let findLineName = arriveLine
            ResultStatn = statnPosDB.find((station) =>
                station.StatnNm == findStatnName && station.LineNm == findLineName)
            if (ResultStatn) {
                console.log("찾았다", ResultStatn)
                break;
            }
        }
        stopStatn = ResultStatn
        console.log("환승역", stopStatn)
        //인덱스 찾기 -> slice()로 범위 추출하기
        console.log(departStatnNm, stopStatn.StatnNm)
        let startIndex = departLineStatnList?.findIndex(station => station.STATN_NM.includes(departStatnNm))
        let stopIndex = departLineStatnList?.findIndex(station => station.STATN_NM == stopStatn.StatnNm)
        console.log("출발, 정차", startIndex, stopIndex)
        if (startIndex >= 0 && stopIndex >= 0 && startIndex <= stopIndex) {
            departToStopList = departLineStatnList?.slice(startIndex, stopIndex + 1)
        }
        else if (startIndex >= 0 && stopIndex >= 0 && startIndex > stopIndex) {
            [startIndex, stopIndex] = [stopIndex, startIndex]
            departToStopList = departLineStatnList?.slice(startIndex, stopIndex + 1).reverse()
        }

        let stopIndex2 = arriveLineStatnList?.findIndex(station => station.STATN_NM == stopStatn.StatnNm)
        let arriveIndex = arriveLineStatnList?.findIndex(station => station.STATN_NM.includes(arriveStatnNm))
        console.log("정차2, 도착", stopIndex2, arriveIndex)
        if (stopIndex2 >= 0 && arriveIndex >= 0 && stopIndex2 <= arriveIndex) {
            stopToArriveList = arriveLineStatnList?.slice(stopIndex2, arriveIndex)
        }
        //index 값 조정
        else if (stopIndex2 >= 0 && arriveIndex >= 0 && stopIndex2 > arriveIndex) {
            [stopIndex2, arriveIndex] = [arriveIndex, stopIndex2]
            stopToArriveList = arriveLineStatnList?.slice(stopIndex2, arriveIndex).reverse()
        }
        let allStopList = [...departToStopList, ...stopToArriveList]
        console.log("departToStopList", allStopList)
    }

    // console.log("실시간 도착", ArrivalList)

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
