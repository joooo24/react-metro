import { useQuery } from "@tanstack/react-query";
import { api_reqre_time } from "../utils/api";

const fetchStationAddress = ({ startIdx, endIdx }) => {
    return api_reqre_time.get(`StationAdresTelno/${startIdx}/${endIdx}`);
};

// 서울교통공사 지하철역 주소 및 전화번호 정보
export const useStationAddressQuery = ({ startIdx, endIdx }) => {
    return useQuery({
        queryKey: ["station-address", startIdx, endIdx ],
        queryFn: () => fetchStationAddress({ startIdx, endIdx }),
        select: (data) => data.data.StationAdresTelno.row
    });
};
