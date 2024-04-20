import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import authenticateReducer from "./authenticateReducer";

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        auth: authenticateReducer,
    },
});

export default store;
