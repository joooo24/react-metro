import React, { useState } from "react";
import "./Header.css";
import mainlogo from "../../assets/images/mainlogo.svg";
import search from "../../assets/images/menusearch.svg";
import login from "../../assets/images/login.svg";
import star from "../../assets/images/star.svg";
import { Link, useNavigate } from "react-router-dom";
import FavoriteStationList from "../../common/FavoriteStationList/FavoriteStationList";

const Header = ({auth, setAuth}) => {
    const [station, setStation] = useState("");
    const [istoggle, setToggle] = useState(false);
    const navigate = useNavigate();

    // ---------- 검색 키워드 ----------
    const searchByKeyword = (e) => {
        e.preventDefault();
        navigate(`/station-detail?q=${station}`);
        setStation("");
    };
    // ---------- 모바일 토글 버튼 ----------
    const isToggleOpen = () => {
        setToggle((istoggle) => !istoggle);
    };

    //-----------로그인버튼---------------
    const goToLoginPage = ()=>{
        if (auth) {
            setAuth(false); 
            navigate("/");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="header">
            <div className="header-fixed-space"></div>
            <header className="header-wrapper">
                <div className="header-inner">
                    <Link to="/">
                        <img className="header-logo" src={mainlogo} alt="logo" />
                    </Link>
                    <div className="header-contents">
                        {/* --------- 서치바 --------- */}
                        <form className="header-search" onSubmit={searchByKeyword}>
                            <img src={search} alt="search" />
                            <input
                                type="text"
                                placeholder="찾으시는 역이 있으신가요?"
                                value={station}
                                onChange={(e) => setStation(e.target.value)}
                            />
                        </form>
                        {/* --------- 즐겨찾기 --------- */}
                        <div className="header-bookmark">
                            <img src={star} alt="star" />
                        </div>
                        {/* --------- 로그인 --------- */}
                        <div className="header-login" onClick={goToLoginPage}>
                            <img src={login} alt="login" />
                            <p>{auth?"로그아웃":"로그인"}</p>
                        </div>
                    </div>
                    <div
                        className={[
                            "header-toggle",
                            `${istoggle ? "show-btn" : "hide-btn"}`,
                        ].join(" ")}
                        onClick={isToggleOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div
                        className={[
                            "header-mobile-menu",
                            `${istoggle ? "show-menu" : "hide-menu"}`,
                        ].join(" ")}
                    >
                        <div className="header-mobile-inner">
                            {/* --------- 로그인 --------- */}
                            <div className="header-login">
                                <img src={login} alt="login" />
                                <p>로그인</p>
                            </div>
                            {/* --------- 서치바 --------- */}
                            <form className="header-search" onSubmit={searchByKeyword}>
                                <img src={search} alt="search" />
                                <input
                                    type="text"
                                    placeholder="찾으시는 역이 있으신가요?"
                                    value={station}
                                    onChange={(e) => setStation(e.target.value)}
                                />
                            </form>
                            <FavoriteStationList />
                        </div>
                    </div>
                </div>
            </header>
        </div>
        
    );
};

export default Header;
