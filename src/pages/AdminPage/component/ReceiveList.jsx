import React from "react";
import "./ReceiveList.css";

const ReceiveList = ({ title, userName, content }) => {
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
    </li>;
};

export default ReceiveList;
