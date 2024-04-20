import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavorites } from "../../../../hooks/useFavorites";

const StationList = ({ currentStation }) => {
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const isFavorite = favorites.includes(currentStation);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            removeFromFavorites(currentStation);
        } else {
            addToFavorites(currentStation);
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
