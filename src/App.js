import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./layouts/AppLayout";
import MainPage from "./pages/MainPage/MainPage";
import ResultPage from './pages/ResultPage/ResultPage';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// MainPage -> /
// ResultPage -> /result
function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<MainPage />} />
                <Route path="/results" element={<ResultPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
