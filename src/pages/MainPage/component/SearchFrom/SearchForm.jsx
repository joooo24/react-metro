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

const SearchForm = () => {
    const { data: stationName } = useStationNameInfoQuery({
        startIdx: 1,
        endIdx: 800,
    });
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

    const stationNameInfo = stationName?.map((station) => ({
        label: station.STATION_NM,
        value: station.STATION_NM,
    }));

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            backgroundColor: "transparent",
            borderRadius: "4px",
            width: "100%",
            height: "30px",
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
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            display: "none", // 드롭다운 버튼을 숨깁니다.
        }),
    };

    const lineOptions = [
        {
            value: "1호선",
            label: (
                <>
                    <img className="line-img" src={line1Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "2호선",
            label: (
                <>
                    <img className="line-img" src={line2Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "3호선",
            label: (
                <>
                    <img className="line-img" src={line3Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "4호선",
            label: (
                <>
                    <img className="line-img" src={line4Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "5호선",
            label: (
                <>
                    <img className="line-img" src={line5Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "6호선",
            label: (
                <>
                    <img className="line-img" src={line6Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "7호선",
            label: (
                <>
                    <img className="line-img" src={line7Imag} alt="" />
                    호선
                </>
            ),
        },
        {
            value: "8호선",
            label: (
                <>
                    <img className="line-img" src={line8Imag} alt="" />
                    호선
                </>
            ),
        },
    ];

    return (
        <div className="main-search-form">
            <h1>FIND YOUR SUB-WAY</h1>
            <span>출발/도착역과 호선 정보를 입력해주세요.</span>
            <form action="" className="search-input" onSubmit={searchSubway}>
                <div>
                    <Select
                        styles={customStyles}
                        className="select-name"
                        placeholder="출발역을 입력해주세요."
                        name="depart"
                        value={stationNameInfo?.find(
                            (option) => option.value === selectInput.depart
                        )}
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
                        options={lineOptions}
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
                        value={stationNameInfo?.find(
                            (option) => option.value === selectInput.arrive
                        )}
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
                            (option) => option.value === inputs.arriveLine
                        )}
                        onChange={(selectedOption) =>
                            onChange({
                                target: {
                                    name: "arriveLine",
                                    value: selectedOption.value,
                                },
                            })
                        }
                        options={lineOptions}
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
