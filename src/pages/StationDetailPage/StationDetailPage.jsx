import React,{useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import StationAddressInfo from "./component/StationAddressInfo/StationAddressInfo";
import ArrivalInfo from "./component/ArrivalInfo/ArrivalInfo";
import RealTimeInfo from "./component/RealTimeInfo/RealTimeInfo";
import StationList from "./component/StationList/StationList";
import "./StationDetailPage.css";
import FullTimetable from './component/FullTimetable/FullTimetable';
import { useRealtimePositionQuery } from "../../hooks/useRealtimePosition";
import FullSubwayMap from "./component/FullSubwayMap/FullSubwayMap";

const StationDetailPage = () => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams();
    const currentStation = query.get("q");

    const [realtimeStation, setRealtimeStation]= useState();
    const { data:stationPosition, isLoading, isError, error } = useRealtimePositionQuery({
        startIdx: 0,
        endIdx: 50,
        statnNm: currentStation
    });

   //-------------------서울지하철노선도 모달------------------------
    const [fullSubwayMap, setFullSubwayMap ] =useState(false);
    if(fullSubwayMap){
        document.body.style.overflow="hidden";
    }else{
        document.body.style.overflow="auto";
    }

    useEffect(() => {
        if (!isLoading && !isError) {
            const foundStation = stationPosition?.find(
                (station) => station.statnNm === currentStation
            );
            setRealtimeStation(foundStation || {});
        }
    }, [isLoading, isError,stationPosition, currentStation]);

    if(isLoading){
        return (<h2>잠시만기다려주세요...</h2>)
    }
    if(isError){
        return (<h2>{error.message}</h2>)
    }

    return (
        <>
            <div className="station-detail-page">
                <div className="map-wrap">지도</div>
                <div className="station-information">
                    {/* 역 리스트 */}
                    <StationList realtimeStation={realtimeStation} />
            
                    {/* 도착정보 */}
                    <ArrivalInfo currentStation={currentStation} />
                    <FullTimetable />
                    <button className="btn-show-station" onClick={()=>setFullSubwayMap(true)}>지하철 노선도 보기</button>
                    {fullSubwayMap? <FullSubwayMap setFullSubwayMap={setFullSubwayMap}/> : null}
                
                    {/* 실시간 도착정보 */}
                    <RealTimeInfo realtimeStation={realtimeStation} />
            
                    {/* 역 주소 */}
                    <StationAddressInfo currentStation={currentStation} />
                </div>
            </div>
            
        </>
    );
};

export default StationDetailPage;
