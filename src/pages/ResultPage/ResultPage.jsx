import { useState, useEffect } from "react";
import "./ResultPage.css";
import { useSearchParams } from "react-router-dom";
import RequiredTime from "./component/RequiredTime/RequiredTime";
import KakaoMap from '../../common/KakaoMap/KakaoMap'
import axios from "axios";
import DepartureArrivalTime from "./component/DepartureArrivalTime/DepartureArrivalTime";


const ResultPage = () => {
    const [query, setQuery] = useSearchParams()
    const departStatnNm = query.get("depart").replace(/역$/, '');
    const arriveStatnNm = query.get("arrive").replace(/역$/, '');
    const departLine = query.get("departLine").replace(/호선$/, '');
    const arriveLine = query.get("arriveLine").replace(/호선$/, '');

    const [statnPositionList, setStatnPositionList] = useState([])
    const [statnLat, setStatnLat] = useState()
    const [statnLng, setStatnLng] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/stations/')
                setStatnPositionList(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (statnPositionList.length > 0) {
            const statnPosition = statnPositionList.find(station => station.StatnNm === departStatnNm)
            if (statnPosition) {
                setStatnLat(statnPosition.lat)
                setStatnLng(statnPosition.lng)
            }
        }

    }, [statnPositionList])

    return (
        <div className="station-result-page">
            <div className="result-map-wrap">
                <KakaoMap statnLat={statnLat} statnLng={statnLng} />
            </div>
            <div className="navigate-result-information">
                <RequiredTime />
                <DepartureArrivalTime />
                <div>
                    경유지
                </div>
            </div>
        </div>
    )
};


// return (
//     <div className="station-detail-page">
//         <div className="map-wrap">지도</div>
//         <div className="station-information">
//             {/* 역 리스트 */}
//             <StationList currentStation={currentStation} />

//             {/* 도착정보 */}
//             <ArrivalInfo currentStation={currentStation} />
//             <FullTimetable />
//             <button className="btn-show-station">지하철 노선도 보기</button>

//             {/* 실시간 도착정보 */}
//             <RealTimeInfo currentStation={currentStation} />

//             {/* 역 주소 */}
//             <StationAddressInfo currentStation={currentStation} />
//         </div>
//     </div>
// );
export default ResultPage;
