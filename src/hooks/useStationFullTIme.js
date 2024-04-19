import { useQuery } from "@tanstack/react-query";
import { api_full_time } from "../utils/api";

const fetchStationFullTime = ({ startIdx, endIdx, stationCd, week, inout }) => {
    return api_full_time.get(`SearchSTNTimeTableByIDService/${startIdx}/${endIdx}/${stationCd}/${week}/${inout}`)
}

// 역 전체 시간
export const useStationFullTimeQuery = ({ startIdx, endIdx, stationCd, week, inout }) => {
    return useQuery({
        queryKey: ['station-full-time', { startIdx, endIdx, stationCd, week, inout }],
        queryFn: () => fetchStationFullTime({ startIdx, endIdx, stationCd, week, inout }),
        select: (result) => result.data.SearchSTNTimeTableByIDService.row,
    })
}