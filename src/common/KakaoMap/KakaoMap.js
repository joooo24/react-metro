import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ statnLat, statnLng }) => {
    return (
        <div>
            {statnLat ? (
                <Map
                    Map
                    center={{ lat: statnLat, lng: statnLng }}
                    style={{
                        width: "100%",
                        height: "900px",
                        borderRadius: "20px",
                        border: "none",
                    }}
                >
                    <MapMarker
                        style={{ border: "tranparent" }}
                        position={{ lat: statnLat, lng: statnLng }}
                    />
                </Map>
            ) : (
                <div>아직 찾지 못했습니다.</div>
            )}
        </div>
    );
};

export default KakaoMap;
