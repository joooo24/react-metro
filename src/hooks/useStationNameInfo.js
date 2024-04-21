import { useQuery } from "@tanstack/react-query";
import { api_name_info } from "../utils/api";

const fetchStationNameInfo = ({ startIdx, endIdx, lineNm }) => {
    return api_name_info.get(`SearchInfoBySubwayNameService/${startIdx}/${endIdx}`)
}

// 서울시 지하철역 정보 검색 (역명)
export const useStationNameInfoQuery = ({ startIdx, endIdx }) => {
    return useQuery({
        queryKey: ['station-name', { startIdx, endIdx }],
        queryFn: () => fetchStationNameInfo({ startIdx, endIdx }),
        select: (result) => result.data.SearchInfoBySubwayNameService.row,
        staleTime: 600000,
    })
}