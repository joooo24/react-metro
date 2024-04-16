import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY

export const api = axios.create({
    baseURL: `http://swopenAPI.seoul.go.kr/api/subway/${API_KEY}/json`
})

export const api_via = axios.create({
    baseURL: `http://openapi.seoul.go.kr:8088/${API_KEY}/json/`
})