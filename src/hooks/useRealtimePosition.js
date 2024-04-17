import { useQuery } from "@tanstack/react-query";
import { api_real_time } from "../utils/api";

const fetchRealtimePosition = ({ startIdx, endIdx, statnNm }) => {
    return api_real_time.get(`realtimeStationArrival/${startIdx}/${endIdx}/${statnNm}`)
}

// 서울시 지하철 실시간 열차 위치정보
export const useRealtimePositionQuery = ({ startIdx, endIdx, statnNm }) => {
    return useQuery({
        queryKey: ['station-arrival', { startIdx, endIdx, statnNm }],
        queryFn: () => fetchRealtimePosition({ startIdx, endIdx, statnNm }),
        select: (result) => result.data.realtimeArrivalList,
    })
}