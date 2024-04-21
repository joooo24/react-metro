import React,{useState} from "react";
import "./SideBar.css";
import sidebarMainImg from "../../assets/images/sidebar-main-img.svg";
import leftArrow from "../../assets/images/left-arrow.svg";
import sidebartitle from "../../assets/images/sidebar-title.svg";
import sidebarnotitle from "../../assets/images/siddbar-notitle.svg"


const SideBar =()=>{
    // -----------사이드바 함수------------
    const [sideBar, setSideBar] = useState(true);
    const [transArrow, setTransArrow] = useState(true);
    const ShowSidebar=()=>{
        setTransArrow((prevState)=>!prevState)
        setSideBar(!sideBar);
    }

    return (
    <div className={`sidebar ${sideBar ? '' : 'closed'}`}>
        <div className="sidebar-wrapper">
            <div className="sidebar-wrapper-area">
                {/* <h1 className="sidebar-title">열차타요</h1> */}
                <div className="sidebar-img-area">
                    <img src={sidebartitle} alt="메인이미지" />
                </div>
            </div>
        </div>
        <div className="close-slider-btn" onClick={ShowSidebar}>
            <img className={`sidebar-arrow ${transArrow ? "left" : "right"}`} src={leftArrow} alt="왼쪽 화살표" />
        </div>
    </div>)
}

export default SideBar;