import React from "react";
import "./MainPage.css";
import SearchForm from "./component/SearchFrom/SearchForm";
// import SideBar from "../../components/SideBar/SideBar";

const MainPage = () => {
    return (
        <div className="main-page">
            {/* <SideBar /> */}
            <div className="search-form">
                <SearchForm />
            </div>
        </div>
    );
};

export default MainPage;
