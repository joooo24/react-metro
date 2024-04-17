import React,{useState} from "react";
import "./SideBar.css";

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
                <h1 className="sidebar-title">열차타요</h1>
                <img src="..\asset\img\sidebar-main-images.png" alt="메인이미지" />
            </div>
        </div>
        <div className="close-slider-btn" onClick={ShowSidebar}>
            <img className={`sidebar-arrow ${transArrow ? "left" : "right"}`} src="../asset/img/left-arrow.svg" alt="오른쪽 화살표" />
        </div>
    </div>)
}

export default SideBar;