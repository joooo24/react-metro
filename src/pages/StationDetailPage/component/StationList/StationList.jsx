// StationList 컴포넌트
import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
    addToFavorites,
    removeFromFavorites,
} from "../../../../actions/favoritesActions";

const StationList = ({ currentStation }) => {
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const isFavorite = favorites.includes(currentStation);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(currentStation));
        } else {
            dispatch(addToFavorites(currentStation));
        }
    };

    return (
        <div className="station-list">
            <div className="station-name">역 이름</div>
            <div className="station-name" onClick={handleToggleFavorite}>
                {currentStation}{" "}
                {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
            </div>
            <div className="station-name">역 이름</div>
        </div>
    );
};

export default StationList;
