import React from "react";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";
import Header from "./Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AppLayout;
