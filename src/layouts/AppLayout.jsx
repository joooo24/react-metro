import React from "react";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";
import Footer from './component/Footer/Footer';

const AppLayout = () => {
    return (
        <>
            <div>AppLayout</div>
            <Outlet />
            <Footer />
        </>
    );
};

export default AppLayout;
