import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useStationAddressQuery } from "../../../../hooks/useStationAddress";

const StationAddressInfo = ({ currentStation }) => {
    const [stationAddress, setStationAddress] = useState({});
    const {
        data: addressData,
        isLoading,
        isError,
        error,
    } = useStationAddressQuery({
        startIdx: 1,
        endIdx: 300,
    });

    useEffect(() => {
        if (!isLoading && !isError) {
            const foundStation = addressData?.find(
                (station) => station.STATN_NM === currentStation
            );
            setStationAddress(foundStation || {});
        }
    }, [isLoading, isError, addressData, currentStation]);

    if (isLoading) {
        return <div>정보를 받아오는 중입니다</div>;
    }

    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

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
