import { useQuery } from "@tanstack/react-query";
import { api_via } from "../utils/api";

const fetchStationVia = ({ startIdx, endIdx, lineNm }) => {
    return api_via.get(`StationDstncReqreTimeHm/${startIdx}/${endIdx}/${lineNm}`)
}


// 역간 거리 및 소요시간 정보
export const useStationViaQuery = ({ startIdx, endIdx, lineNm }) => {
    return useQuery({
        queryKey: ['station-via', { startIdx, endIdx, lineNm }],
        queryFn: () => fetchStationVia({ startIdx, endIdx, lineNm }),
        select: (result) => result.data.StationDstncReqreTimeHm.row,
    })
}