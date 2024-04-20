import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSearchFirstAndLastTimeQuery } from "../../../../hooks/useSearchFirstAndLastTime";
import { useStationNameInfoQuery } from "../../../../hooks/useStationNameInfo";

const ArrivalInfo = ({ currentStation }) => {
    const [stationInfo, setStationInfo] = useState({});
    const [lineNumber, setLineNumber] = useState("");
    const { data: stationName } = useStationNameInfoQuery({
        startIdx: 1,
        endIdx: 1000,
    });

    useEffect(() => {
        const foundStation = stationName?.find(
            (item) => item.STATION_NM === currentStation
        );
        if (foundStation) {
            setStationInfo(foundStation);
            const formattedLineNum = String(foundStation.LINE_NUM).replace(
                /^0+/,
                ""
            );
            setLineNumber(formattedLineNum);
        }
    }, [stationName, currentStation]);

    const {
        data: stationArrivalData,
        isLoading,
        isError,
        error,
    } = useSearchFirstAndLastTimeQuery({
        START_INDEX: 1,
        END_INDEX: 1,
        LINE_NUM: lineNumber,
        INOUT_TAG: 1, // 상행/내선
        WEEK_TAG: 1, // 평일
        STATION_CD: stationInfo?.STATION_CD,
        FR_CODE: stationInfo?.FR_CODE,
    });

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
        return `${formattedHour}:${minute}:${second} ${period}`;
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
