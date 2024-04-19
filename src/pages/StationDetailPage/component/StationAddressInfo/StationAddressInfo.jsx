import React from "react";

const StationAddressInfo = ({ stationAddress }) => {
    if (!stationAddress) return null;

    return (
        <div className="station-address">
            <h4>주소</h4>
            <p>
                {stationAddress.ADRES}
                <br />
                {stationAddress.RDNMADR}
            </p>
            <p>
                {stationAddress.TELNO} <b>대표번호</b>
            </p>
            <p>
                02-6110-1122 <b>유실물센터</b>
            </p>
        </div>
    );
};

export default StationAddressInfo;
