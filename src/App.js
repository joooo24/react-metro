import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./layouts/AppLayout";
import MainPage from "./pages/MainPage/MainPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import StationDetailPage from "./pages/StationDetailPage/StationDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminPage from "./pages/AdminPage/AdminPage";
import ReportForm from "./pages/ResultPage/component/ReportForm/ReportForm";

function App() {
    const [auth, setAuth] = useState(false);

    return (
        <Routes>
            <Route
                path="/"
                element={<AppLayout auth={auth} setAuth={setAuth} />}
            >
                <Route index element={<MainPage />} />
                <Route
                    path="/login"
                    element={<LoginPage setAuth={setAuth} />}
                />
                <Route path="arrival-result" element={<ResultPage />} />
                <Route path="station-detail" element={<StationDetailPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="incorrectInfo" element={<ReportForm />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
