import React from "react";
import "./MainPage.css";
import SearchForm from "./component/SearchFrom/SearchForm";
import SideBar from "../../components/SideBar/SideBar";

const MainPage = () => {
    return (
        <div className="search-form">
            <SearchForm />
            <SideBar />
        </div>
    );
};

export default MainPage;
