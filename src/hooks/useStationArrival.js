import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

const fetchStationArrival = ({ startIdx, endIdx, statnNm }) => {
    return api.get(`realtimeStationArrival/${startIdx}/${endIdx}/${statnNm}`)
}

// 서울시 지하철 실시간 열차 위치정보
export const useStationArrivalQuery = ({ startIdx, endIdx, statnNm }) => {
    return useQuery({
        queryKey: ['station-arrival', { startIdx, endIdx, statnNm }],
        queryFn: () => fetchStationArrival({ startIdx, endIdx, statnNm }),
        select: (result) => result.data.realtimeArrivalList,
    })
}