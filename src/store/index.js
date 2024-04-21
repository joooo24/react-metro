import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import authenticateReducer from "./authenticateReducer";
import reportsReducer from "./reportsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    auth: authenticateReducer,
    reports: reportsReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["reports", "favorites"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
