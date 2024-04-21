import React from "react";
import ReportForm from "./ResultPage/component/ReportForm/ReportForm";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth }) => {
    // return auth2 == true ? <ReportForm /> : <Navigate to="/login" />;
};

export default PrivateRoute;
