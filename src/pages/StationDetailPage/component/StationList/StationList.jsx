import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    addToFavorites,
    removeFromFavorites,
} from "../../../../store/favoritesSlice";
import { useStationNameInfoQuery } from "../../../../hooks/useStationNameInfo";

const StationList = ({ currentStation }) => {
    const navigate = useNavigate();
    const {
        data: stationName,
        isLoading,
        isError,
        error,
    } = useStationNameInfoQuery({
        startIdx: 1,
        endIdx: 1000,
    });

    // 현재 역 정보
    const [stationLineNm, setStationLineNm] = useState("");
    useEffect(() => {
        const foundStation = stationName?.find(
            (item) => item.STATION_NM === currentStation
        );
        if (foundStation) {
            setStationLineNm(foundStation.LINE_NUM);
        }
    }, [stationName, currentStation]);

    // 현재 역 호선 정보
    const [stationLineInfo, setStationLineInfo] = useState({});
    useEffect(() => {
        if (stationName && stationLineNm) {
            const filteredStationInfo = stationName.filter(
                (item) => item.LINE_NUM === stationLineNm
            );
            if (filteredStationInfo.length > 0) {
                setStationLineInfo(filteredStationInfo);
            }
        }
    }, [stationName, stationLineNm]);

    // 현재 역 정보에서 인접한 역 정보
    const [prevStation, setPrevStation] = useState(null);
    const [nextStation, setNextStation] = useState(null);

    useEffect(() => {
        if (stationLineInfo.length > 0) {
            const currentIndex = stationLineInfo.findIndex(
                (item) => item.STATION_NM === currentStation
            );

            if (currentIndex !== -1) {
                setPrevStation(
                    currentIndex > 0 ? stationLineInfo[currentIndex - 1] : null
                );
                setNextStation(
                    currentIndex < stationLineInfo.length - 1
                        ? stationLineInfo[currentIndex + 1]
                        : null
                );
            }
        }
    }, [stationLineInfo, currentStation]);

    // 즐겨찾기
    const favorites = useSelector((state) => state.favorites.favorites);
    const dispatch = useDispatch();
    const isFavorite = favorites.includes(currentStation);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(currentStation));
        } else {
            dispatch(addToFavorites(currentStation));
        }
    };

    // 이동
    const handleStationClick = (stationName) => {
        navigate(`/station-detail?q=${encodeURIComponent(stationName)}`);
    };

    if (isLoading) {
        return <div>정보를 받아오는 중입니다</div>;
    }

    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <div className="station-list">
            {prevStation && (
                <div
                    className="station-name"
                    onClick={() => handleStationClick(prevStation.STATION_NM)}
                >
                    {prevStation.STATION_NM}
                </div>
            )}
            <div
                className="station-name current"
                onClick={handleToggleFavorite}
            >
                {currentStation}
                {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
            </div>
            {nextStation && (
                <div
                    className="station-name"
                    onClick={() => handleStationClick(nextStation.STATION_NM)}
                >
                    {nextStation.STATION_NM}
                </div>
            )}
        </div>
    );
};

export default StationList;
