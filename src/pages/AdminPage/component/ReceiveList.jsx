import React from "react";
import "./ReceiveList.css";
import { removeFromReports } from "../../../store/reportsSlice";
import { useDispatch } from "react-redux";
import user from "../../../assets/images/user.svg";

const ReceiveList = ({ title, userName, content }) => {
    const dispatch = useDispatch();

    const handleRemoveReport = (title) => {
        if (window.confirm("정말 삭제하겠습니까?")) {
            dispatch(removeFromReports(title));
        }
    };

    return (
        <li className="admin-content">
            <div className="receive-list-container">
                <div className="receive-list-username">
                    <img src={user} alt="user"></img>
                    {userName}
                </div>
                <div className="receive-list-title">
                    <span>신고제목 - </span>
                    {title}
                </div>
                <div className="receive-list-content">
                    <span>신고내용</span>
                    <br />
                    {content}
                </div>
            </div>
            <button
                className="receive-list-remove"
                onClick={() => handleRemoveReport(title)}
            >
                삭제
            </button>
        </li>
    );
};

export default ReceiveList;
