import React from "react";
import "./ReceiveList.css";
import { removeFromReports } from "../../../store/reportsSlice";
import { useDispatch } from "react-redux";

const ReceiveList = ({ title, userName, content }) => {
    const dispatch = useDispatch()

    const handleRemoveReport = (title) => {
        if (window.confirm("정말 삭제하겠습니까?")) {
            dispatch(removeFromReports(title));
        }
    }

    return <li className="admin-content">
        <div>
            신고제목 - {title}
        </div>
        <div>
            신고자 - {userName}
        </div>
        <div>
            신고내용 - {content}
        </div>
        <button onClick={() => handleRemoveReport(title)}>휴지통</button>
    </li>;
};

export default ReceiveList;
