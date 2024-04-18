import React from "react";
import { useLocation } from "react-router-dom";
import "./ResultPage.css";
import Stopover from "./component/Stopover";

const ResultPage = () => {
    const location = useLocation();
    // 현재 위치를 얻기 위해 useLocation 훅 사용

    // URL의 쿼리 문자열
    const queryParams = new URLSearchParams(location.search);

    // 쿼리 문자열에서 매개변수 가져오기
    const depart = queryParams.get("depart");
    const arrive = queryParams.get("arrive");
    const departLine = queryParams.get("departLine");
    const arriveLine = queryParams.get("arriveLine");

    console.log("rrr", depart, arrive, departLine, arriveLine);

    return (
        <div>
            <Stopover
                depart={depart}
                arrive={arrive}
                departLine={departLine}
                arriveLine={arriveLine}
            />
        </div>
    );
};

export default ResultPage;
