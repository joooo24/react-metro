import { useQuery } from "@tanstack/react-query";
import { api_map_position } from "../utils/api";

const fetchStationPosition = () => {
    return api_map_position.get()
}

export const useStationPositionQuery = () => {
    return useQuery({
        queryKey: ['station-position'],
        queryFn: () => fetchStationPosition(),
        select: (result) => result.data,
        staleTime: 50000, // 재호출 방지
    })
}