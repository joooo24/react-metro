import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(
                (name) => name !== action.payload
            );
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
