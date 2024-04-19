import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSearchFirstAndLastTimeQuery } from "../../../../hooks/useSearchFirstAndLastTime";
import { useStationNameInfoQuery } from "../../../../hooks/useStationNameInfo";

const ArrivalInfo = ({ currentStation }) => {
    const [stationNameInfo, setStationNameInfo] = useState({}); // 초기 상태를 빈 객체로 설정
    const [replaceLINE_NUM, setReplaceLINE_NUM] = useState("");

    const { data: stationName } = useStationNameInfoQuery({
        startIdx: 1,
        endIdx: 1000,
    });
    console.log("stationName", stationName);

    // 현재 역 정보
    useEffect(() => {
        const foundStation = stationName?.find(
            (item) => item.STATION_NM === currentStation
        );
        if (foundStation) {
            setStationNameInfo(foundStation);
        }
    }, [stationName, currentStation]);

    useEffect(() => {
        if (stationNameInfo && stationNameInfo.LINE_NUM != null) {
            const formattedLineNum = String(stationNameInfo.LINE_NUM).replace(
                /^0+/,
                ""
            );
            setReplaceLINE_NUM(formattedLineNum);
        }
    }, [stationNameInfo]);

    // 도착 시간 정보
    const {
        data: stationArrivalData,
        isLoading,
        isError,
        error,
    } = useSearchFirstAndLastTimeQuery({
        START_INDEX: 1,
        END_INDEX: 1,
        LINE_NUM: replaceLINE_NUM,
        INOUT_TAG: 1, // 상행/내선
        WEEK_TAG: 1, // 평일
        STATION_CD: stationNameInfo?.STATION_CD,
        FR_CODE: stationNameInfo?.FR_CODE,
    });

    console.log(
        "LINE_NUM",
        replaceLINE_NUM,
        "STATION_CD",
        stationNameInfo?.STATION_CD,
        "FR_CODE",
        stationNameInfo?.FR_CODE
    );

    console.log("stationArrivalData", stationArrivalData);

    // 시간 포맷
    const convertTo12HourFormat = (timeString) => {
        const hour = timeString.substring(0, 2);
        const minute = timeString.substring(2, 4);
        const second = timeString.substring(4, 6);

        let formattedHour = parseInt(hour);
        const period = formattedHour >= 12 ? "PM" : "AM";

        if (formattedHour === 0) {
            formattedHour = 12; // 자정을 12시로 표시
        } else if (formattedHour > 12) {
            formattedHour -= 12; // 오후 시간을 12시간 형식으로 변환
        }

        // 시간을 "hh:mm:ss AM/PM" 형식으로 변환
        const formattedTime = `${formattedHour}:${minute}:${second} ${period}`;
        return formattedTime;
    };

    if (isLoading) {
        return <div>정보를 받아오는 중입니다</div>;
    }

    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }
    return (
        <ul className="arr-start-end">
            {stationArrivalData && (
                <>
                    <li>
                        <span className="tit">첫차</span>
                        <span className="time">
                            {convertTo12HourFormat(
                                stationArrivalData.FIRST_TIME
                            )}
                        </span>
                    </li>
                    <li>
                        <span className="tit">막차</span>
                        <span className="time">
                            {convertTo12HourFormat(
                                stationArrivalData.LAST_TIME
                            )}
                        </span>
                    </li>
                </>
            )}
        </ul>
    );
};

export default ArrivalInfo;
