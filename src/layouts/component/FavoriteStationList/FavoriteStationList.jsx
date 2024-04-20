import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../../actions/favoritesActions";
import "./FavoriteStationList.css";

const FavoriteStationList = () => {
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFavorite = (stationName) => {
        dispatch(removeFromFavorites(stationName));
    };

    return (
        <div className="favorite-station-list">
            <div className="header-bookmark">
                <p>즐겨찾기</p>
            </div>
            <ul className="header-bookmark-contents">
                {favorites.map((stationName) => (
                    <li key={stationName}>
                        <p>{stationName}</p>
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
