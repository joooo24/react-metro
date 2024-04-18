import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

export const api_real_time = axios.create({
    baseURL: `http://swopenAPI.seoul.go.kr/api/subway/${API_KEY}/json`,
});

export const api_reqre_time = axios.create({
    baseURL: `http://openapi.seoul.go.kr:8088/${API_KEY}/json/`,
});
