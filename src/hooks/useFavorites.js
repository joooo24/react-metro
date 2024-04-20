import { useState } from "react";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (stationName) => {
        setFavorites((prevFavorites) => [...prevFavorites, stationName]);
    };

    const removeFromFavorites = (stationName) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((name) => name !== stationName)
        );
    };

    return { favorites, addToFavorites, removeFromFavorites };
};
