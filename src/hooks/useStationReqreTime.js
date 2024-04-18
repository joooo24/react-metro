import { useQuery } from "@tanstack/react-query";
import { api_reqre_time } from "../utils/api";

const fetchStationReqreTime = ({ startIdx, endIdx, lineNm }) => {
    return api_reqre_time.get(
        `StationDstncReqreTimeHm/${startIdx}/${endIdx}/${lineNm}`
    );
};

// 역간 거리 및 소요시간 정보
export const useStationReqreTimeQuery = ({ startIdx, endIdx }) => {
    return useQuery({
        queryKey: ["station-via", { startIdx, endIdx }],
        queryFn: () => fetchStationReqreTime({ startIdx, endIdx }),
        select: (result) => result.data.StationDstncReqreTimeHm.row,
    });
};
