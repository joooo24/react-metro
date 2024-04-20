import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../store/favoritesSlice";
import { useNavigate } from "react-router-dom";
import "./FavoriteStationList.css";

const FavoriteStationList = () => {
    const favorites = useSelector((state) => state.favorites.favorites);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleRemoveFavorite = (stationName) => {
        dispatch(removeFromFavorites(stationName));
    };

    const handleStationClick = (stationName) => {
        navigate(`/station-detail?q=${encodeURIComponent(stationName)}`);
    };

    return (
        <div className="favorite-station-list">
            <div className="header-bookmark">
                <p>즐겨찾기</p>
            </div>
            <ul className="header-bookmark-contents">
                {favorites.map((stationName) => (
                    <li key={stationName}>
                        <p onClick={() => handleStationClick(stationName)}>
                            {stationName}
                        </p>
                        <p onClick={() => handleRemoveFavorite(stationName)}>
                            <MdClose />
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteStationList;
