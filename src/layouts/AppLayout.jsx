import React from "react";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";

const AppLayout = () => {
    return (
        <>
            <div>AppLayout</div>
            <Outlet />
        </>
    );
};

export default AppLayout;
