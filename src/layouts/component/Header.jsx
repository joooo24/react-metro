import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Header.css";
import mainlogo from "../../assets/images/mainlogo.svg";
import search from "../../assets/images/menusearch.svg";
import login from "../../assets/images/login.svg";
import star from "../../assets/images/star.svg";
import { Link, useNavigate } from "react-router-dom";
import { useStationNameInfoQuery } from "../../hooks/useStationNameInfo";
import FavoriteStationList from "../../common/FavoriteStationList/FavoriteStationList";
import { MdClose } from "react-icons/md";

const Header = ({ auth, setAuth }) => {
    const [istoggle, setToggle] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);
    const [stationOptions, setStationOptions] = useState([]);
    const navigate = useNavigate();

    const { data: stationName } = useStationNameInfoQuery({
        startIdx: 1,
        endIdx: 784,
    });

    console.log(stationName);

    // ---------- 드롭다운 스타일 ----------
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            backgroundColor: "transparent",
            borderRadius: "30px",
            width: "100%",
            height: "60px",
            display: "flex",
            boxShadow: "none",
            textAlign: "left",
            paddingLeft: "45px",
            cursor: "pointer",
        }),
        menu: (provided, state) => ({
            ...provided,
            width: "auto",
            height: "auto",
            cursor: "pointer",
        }),
        menuList: (provided, state) => ({
            ...provided,

            display: "flex",
            flexWrap: "wrap",
            maxHeight: "200px", // 드롭다운 메뉴의 최대 높이를 지정합니다.
            overflowY: "auto", // 세로 스크롤을 추가합니다.
        }),
        option: (provided, state) => ({
            ...provided,
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            width: "100%",
            boxSizing: "border-box",
            cursor: "pointer",
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            display: "none", // 드롭다운 버튼을 숨깁니다.
        }),
    };

    // ---------- 검색 키워드 ----------
    useEffect(() => {
        if (stationName) {
            const filteredStations = stationName.filter((station) => {
                const lineNum = station.LINE_NUM;
                return (
                    lineNum === "01호선" ||
                    lineNum === "02호선" ||
                    lineNum === "03호선" ||
                    lineNum === "04호선" ||
                    lineNum === "05호선" ||
                    lineNum === "06호선" ||
                    lineNum === "07호선" ||
                    lineNum === "08호선"
                );
            });

            const uniqueStations = [
                ...new Set(
                    filteredStations.map((station) => station.STATION_NM)
                ),
            ].sort();

            const stationOptions = uniqueStations.map((station) => ({
                value: station,
                label: station,
            }));
            setStationOptions(stationOptions);
        }
    }, [stationName]);

    const searchByStation = (e) => {
        e.preventDefault();
        console.log("enter");
        if (selectedStation) {
            navigate(
                `/station-detail?q=${encodeURIComponent(selectedStation.value)}`
            );
            setSelectedStation("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 기본 동작 방지
            searchByStation(e); // 폼 제출 함수 호출
        }
    };

    // const searchByKeyword = (e) => {
    //     e.preventDefault();
    //     navigate(`/station-detail?q=${station}`);
    //     setStation("");
    // };
    // ---------- 모바일 토글 버튼 ----------
    const isToggleOpen = () => {
        setToggle((istoggle) => !istoggle);
    };
    // 페이지 이동 후에 모바일 사이드바를 닫음
    const closeMobileMenu = () => {
        if (istoggle) {
            setToggle(false);
        }
    };

    //-----------로그인버튼---------------
    const goToLoginPage = () => {
        if (auth) {
            setAuth(false);
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    const [showFavoriteList, setShowFavoriteList ] = useState(false);
    console.log("showFavoriteList",showFavoriteList)

    return (
        <div className="header">
            <div className="header-fixed-space"></div>
            <header className="header-wrapper">
                <div className="header-inner">
                    <Link to="/">
                        <img
                            className="header-logo"
                            src={mainlogo}
                            alt="logo"
                        />
                    </Link>
                    <div className="header-contents">
                        {/* --------- 서치바 --------- */}
                        <form
                            className="header-search"
                            onSubmit={searchByStation}
                        >
                            <img src={search} alt="search" />
                            <Select
                                styles={customStyles}
                                className="header-input"
                                options={stationOptions}
                                placeholder="찾으시는 역이 있으신가요?"
                                value={selectedStation}
                                onChange={(selectedOption) => {
                                    // 직접 입력한 경우
                                    if (
                                        !selectedOption ||
                                        !selectedOption.value
                                    ) {
                                        setSelectedStation({
                                            value: selectedOption,
                                            label: selectedOption,
                                        });
                                    } else {
                                        setSelectedStation(selectedOption);
                                    }
                                }}
                                onInputChange={(inputValue, actionMeta) => {
                                    if (actionMeta.action === "input-change") {
                                        setSelectedStation(null); // 인풋값이 변경되면 selectedStation 상태를 비움
                                    }
                                }}
                            />
                            <button type="submit">검색</button>
                        </form>
                        {/* --------- 즐겨찾기 --------- */}
                        <div className="header-bookmark" onClick={() => setShowFavoriteList(true)}>
                            <img src={star} alt="star" />
                        </div>
                        {/* --------- 로그인 --------- */}
                        <div className="header-login" onClick={goToLoginPage}>
                            <img src={login} alt="login" />
                            <p>{auth ? "로그아웃" : "로그인"}</p>
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
                            <form
                                className="header-search"
                                onSubmit={searchByStation}
                            >
                                <img src={search} alt="search" />
                                <Select
                                    styles={customStyles}
                                    className="header-input"
                                    options={stationOptions}
                                    placeholder="찾으시는 역이 있으신가요?"
                                    value={selectedStation}
                                    onChange={(selectedOption) => {
                                        // 직접 입력한 경우
                                        if (
                                            !selectedOption ||
                                            !selectedOption.value
                                        ) {
                                            setSelectedStation({
                                                value: selectedOption,
                                                label: selectedOption,
                                            });
                                        } else {
                                            setSelectedStation(selectedOption);
                                        }
                                    }}
                                    onInputChange={(inputValue, actionMeta) => {
                                        if (
                                            actionMeta.action === "input-change"
                                        ) {
                                            setSelectedStation(null); // 인풋값이 변경되면 selectedStation 상태를 비움
                                        }
                                    }}
                                />
                                <button type="submit">검색</button>
                            </form>
                            <FavoriteStationList />
                        </div>
                    </div>
                </div>
            </header>
            {showFavoriteList ? (
               
                <div className="favorite-list-modal">
                    <div className="favorite-list-inner">
                    <MdClose className="btn-close" onClick={() => setShowFavoriteList(false)}/>
                    <FavoriteStationList />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Header;
