import { useQuery } from "@tanstack/react-query";
import { api_reqre_time } from "../utils/api";

const fetchStationReqre = ({ startIdx, endIdx }) => {
    return api_reqre_time.get(`StationDstncReqreTimeHm/${startIdx}/${endIdx}`);
};

// 역간 거리 및 소요시간 정보
export const useStationReqreQuery = ({ startIdx, endIdx }) => {
    return useQuery({
        queryKey: ["station-via", { startIdx, endIdx }],
        queryFn: () => fetchStationReqre({ startIdx, endIdx }),
        select: (result) => result.data.StationDstncReqreTimeHm.row,
    });
};
