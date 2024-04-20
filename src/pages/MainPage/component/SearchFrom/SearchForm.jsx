import React, { useState } from "react";
import "./SearchForm.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useStationNameInfoQuery } from "../../../../hooks/useStationNameInfo";
import line1Imag from "../../../../assets/images/line/line1.png";
import line2Imag from "../../../../assets/images/line/line2.png";
import line3Imag from "../../../../assets/images/line/line3.png";
import line4Imag from "../../../../assets/images/line/line4.png";
import line5Imag from "../../../../assets/images/line/line5.png";
import line6Imag from "../../../../assets/images/line/line6.png";
import line7Imag from "../../../../assets/images/line/line7.png";
import line8Imag from "../../../../assets/images/line/line8.png";
import { useStationReqreAllQuery } from "../../../../hooks/useStationReqreAll";

const SearchForm = () => {
    const { data: fullStationName } = useStationNameInfoQuery({
        startIdx: 1,
        endIdx: 800,
    });
    // console.log('fullStationName', fullStationName);
    const { data: stationName } = useStationReqreAllQuery({
        startIdx: 1,
        endIdx: 300,
    });
    // console.log('stationName', stationName);

    const [selectInput, setSelectInput] = useState({
        depart: "",
        arrive: "",
    });
    const [inputs, setInputs] = useState({
        departLine: "",
        arriveLine: "",
    });
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const onChangeSelect = (selectedOption, { name }) => {
        setSelectInput({ ...selectInput, [name]: selectedOption.value });
    };

    const searchSubway = (e) => {
        e.preventDefault();
        // inputs 및 selectInput 객체의 각 키와 값을 반복하여 URL 쿼리 문자열로 구성
        const queryStringParams = Object.keys({ ...selectInput, ...inputs })
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        { ...selectInput, ...inputs }[key]
                    )}`
            )
            .join("&");
        navigate(`/arrival-result?${queryStringParams}`);
    };

    // 출발역, 도착역 options값 중복 제거
    const uniqueStationNames = [
        ...new Set(stationName?.map((station) => station.STATN_NM)),
    ];
    console.log("unipque", uniqueStationNames);

    const stationNameInfo = uniqueStationNames?.map((station) => ({
        label: station,
        value: station,
    }));

    // react-select 라이브러리 custom
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            backgroundColor: "transparent",
            borderRadius: "4px",
            width: "100%",
            height: "60px",
            display: "flex",
            boxShadow: "none",
            textAlign: "center",
            padding: "18px 0",
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
            maxHeight: "200px",
            overflowY: "auto",
        }),
        option: (provided, state) => ({
            ...provided,
            width: "100%",
            boxSizing: "border-box",
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            display: "none",
        }),
    };

    // line option 선택
    const lineOptions = [
        {
            value: "01호선",
            label: (
                <>
                    <img className="line-img" src={line1Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "02호선",
            label: (
                <>
                    <img className="line-img" src={line2Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "03호선",
            label: (
                <>
                    <img className="line-img" src={line3Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "04호선",
            label: (
                <>
                    <img className="line-img" src={line4Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "05호선",
            label: (
                <>
                    <img className="line-img" src={line5Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "06호선",
            label: (
                <>
                    <img className="line-img" src={line6Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "07호선",
            label: (
                <>
                    <img className="line-img" src={line7Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "08호선",
            label: (
                <>
                    <img className="line-img" src={line8Imag} alt="" />
                    호선
                </>
            ),
        },
    ];

    const departStation = stationNameInfo?.find(
        (option) => option.value === selectInput.depart
    );
    const arriveStation = stationNameInfo?.find(
        (option) => option.value === selectInput.arrive
    );
    // console.log('depart', departStation);
    // console.log('arrive', arriveStation);

    const departValue = fullStationName
        ?.filter((item) => item.STATION_NM === departStation?.value)
        ?.map((item) => item.LINE_NUM);
    const arriveValue = fullStationName
        ?.filter((item) => item.STATION_NM === arriveStation?.value)
        ?.map((item) => item.LINE_NUM);
    // console.log('departValue', departValue);
    // console.log('arriveValue', arriveValue);

    const departLineOptions = lineOptions
        ?.filter((item) => departValue?.includes(item.value))
        ?.map((filteredItem) => ({
            value: filteredItem.value,
            label: filteredItem.label,
        }));
    const arriveLineOptions = lineOptions
        ?.filter((item) => arriveValue?.includes(item.value))
        ?.map((filteredItem) => ({
            value: filteredItem.value,
            label: filteredItem.label,
        }));
    // console.log(departLineOptions);
    // console.log(arriveLineOptions);

    return (
        <div className="main-search-form">
            <h1>FIND YOUR SUB-WAY</h1>
            <span>출발/도착역과 호선 정보를 입력해주세요.</span>
            <p>1~8호선까지의 역만 입력 가능합니다.</p>
            <form action="" className="search-input" onSubmit={searchSubway}>
                <div>
                    <Select
                        styles={customStyles}
                        className="select-name"
                        placeholder="출발역을 입력해주세요."
                        name="depart"
                        value={departStation}
                        onChange={onChangeSelect}
                        options={stationNameInfo}
                        required
                        components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                        }}
                    />

                    <Select
                        styles={customStyles}
                        className="select-line"
                        name="departLine"
                        value={lineOptions.find(
                            (option) => option.value === inputs.departLine
                        )}
                        onChange={(selectedOption) =>
                            onChange({
                                target: {
                                    name: "departLine",
                                    value: selectedOption.value,
                                },
                            })
                        }
                        options={departLineOptions}
                        required
                        components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                        }}
                    />
                </div>
                <div>
                    <Select
                        styles={customStyles}
                        className="select-name"
                        placeholder="도착역을 입력해주세요."
                        name="arrive"
                        value={arriveStation}
                        onChange={onChangeSelect}
                        options={stationNameInfo}
                        required
                        components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                        }}
                    />
                    <Select
                        styles={customStyles}
                        className="select-line"
                        name="arriveLine"
                        value={lineOptions.find(
                            (option) => option.value === inputs.arrivetLine
                        )}
                        onChange={(selectedOption) =>
                            onChange({
                                target: {
                                    name: "arriveLine",
                                    value: selectedOption.value,
                                },
                            })
                        }
                        options={arriveLineOptions}
                        required
                        components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                        }}
                    />
                </div>
                <button type="submit">길찾기</button>
            </form>
        </div>
    );
};

export default SearchForm;
