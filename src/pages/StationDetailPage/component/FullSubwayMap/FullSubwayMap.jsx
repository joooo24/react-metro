import React from "react";
import './FullSubwayMap.css';
import seoulMetro from "../../../../assets/images/seoul-metro-map.svg"


const FullSubwayMap =({setFullSubwayMap})=>{
    
    return (
    <div className="fullsubwaymap-modal">
        <div className="fullsubwaymap-modal-inner">
            <div className="fullsubwaymap-modal-header">
                <div className="fullsubwaymap-modal-title">서울 지하철 노선도</div>
                <button className="fullsubwaymap-modal-close-btn" onClick={()=>setFullSubwayMap(false)}>
                    <i className="xi-close"></i>
                </button>
            </div>
            <div className="fullsubwaymap-modal-body">
                <img src={seoulMetro} alt="서울지하철노선도" />
            </div>
        </div>
    </div>);
}

export default FullSubwayMap;