import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import reportsReducer from "./reportsSlice"
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['reports'],
}

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    reports: reportsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
