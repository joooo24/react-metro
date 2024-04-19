import { useQuery } from "@tanstack/react-query";
import { api_reqre_time } from "../utils/api";
//
const fetchSearchFirstAndLastTime = ({
    START_INDEX,
    END_INDEX,
    LINE_NUM,
    INOUT_TAG,
    WEEK_TAG,
    STATION_CD,
    FR_CODE,
}) => {
    return api_reqre_time.get(
        `SearchFirstAndLastTrainbyLineServiceNew/${START_INDEX}/${END_INDEX}/${LINE_NUM}/${INOUT_TAG}/${WEEK_TAG}/${STATION_CD}/${FR_CODE}`
    );
};
// 서울시 지하철 호선별 첫차와 막차 정보(전철역코드,외부코드)
export const useSearchFirstAndLastTimeQuery = ({
    START_INDEX,
    END_INDEX,
    LINE_NUM,
    INOUT_TAG,
    WEEK_TAG,
    STATION_CD,
    FR_CODE,
}) => {
    return useQuery({
        queryKey: ["station-address", START_INDEX, END_INDEX],
        queryFn: () =>
            fetchSearchFirstAndLastTime({
                START_INDEX,
                END_INDEX,
                LINE_NUM,
                INOUT_TAG,
                WEEK_TAG,
                STATION_CD,
                FR_CODE,
            }),
        select: (data) => data.data,
    });
};

// START_INDEX  INTEGER(필수) 요청시작위치  정수 입력 (페이징 시작번호 입니다 : 데이터 행 시작번호)
// END_INDEX    INTEGER(필수) 요청종료위치  정수 입력 (페이징 끝번호 입니다 : 데이터 행 끝번호)
// LINE_NUM STRING(필수)  호선  1호선, 2호선, 3호선, 4호선, 5호선, 6호선, 7호선, 8호선, 9호선
// INOUT_TAG    STRING(필수)  상행,내선:1, 하행,외선:2
// WEEK_TAG STRING(필수)  요일  평일:1, 토요일:2, 휴일/일요일:3
// STATION_CD   STRING(선택)  전철역코드   전철역코드(공백가능)
// FR_CODE STRING(선택)
