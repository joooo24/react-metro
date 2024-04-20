import React from "react";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";
import Footer from './component/Footer/Footer';
import Header from "./component/Header";

const AppLayout = ({auth,setAuth}) => {
    return (
        <>
            <Header auth={auth} setAuth={setAuth}/>
            <Outlet />
            <Footer />
        </>
    );
};

export default AppLayout;
