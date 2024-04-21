import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

export const api_real_time = axios.create({
    baseURL: `https://swopenAPI.seoul.go.kr/api/subway/${API_KEY}/json`,
});

export const api_reqre_time = axios.create({
    baseURL: `https://openapi.seoul.go.kr:8088/${API_KEY}/json/`
})

export const api_full_time = axios.create({
    baseURL: `https://openAPI.seoul.go.kr:8088/${API_KEY}/json/`
})

export const api_name_info = axios.create({
    baseURL: `https://openAPI.seoul.go.kr:8088/${API_KEY}/json/`
})

export const api_map_position = axios.create({
    // baseURL: `http://localhost:5000/stations/`
    baseURL: `http://my-json-server.typicode.com/joooo24/metro-db/stations/`
})
