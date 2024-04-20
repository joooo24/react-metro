import { useQuery } from "@tanstack/react-query";
import { api_real_time } from "../utils/api";

const fetchStationInfo = ({startIdx,endIdx,subwayNm}) =>{
    return api_real_time.get(`realtimePosition/${startIdx}/${endIdx}/${subwayNm}`);
}

export const useStationInfoQuery= ({startIdx,endIdx,subwayNm}) =>{
    return (useQuery({
        queryKey:["StationInfo",{startIdx,endIdx,subwayNm}],
        queryFn: ()=>fetchStationInfo({startIdx,endIdx,subwayNm}),
        select:(result) => result.data.realtimePositionList
    }))
}