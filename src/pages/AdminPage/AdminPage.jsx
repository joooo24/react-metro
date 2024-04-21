import { useState, useEffect } from "react";
import "./AdminPage.style.css";
import { useNavigate } from "react-router-dom";
import ReceiveList from "./component/ReceiveList";
import { useSelector } from "react-redux";

const AdminPage = () => {
    const navigate = useNavigate();
    const [adminAuth, setAdminAuth] = useState(false);
    let reports = useSelector(state => state.reports.reports)
    console.log("신고접수 목록", reports)

    useEffect(() => {
        const passKey = prompt("관리자 PassKey를 입력하세요.");
        if (passKey === "1234") {
            alert(`안녕하세요, 관리자님!`);
            setAdminAuth(true);
        } else {
            alert("PassKey가 일치하지 않습니다.");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="admin-page">
            {adminAuth && (
                <article className="admin-wrapper">
                    <div className="admin-title">
                        <h1>관리자 페이지</h1>
                        <p>
                            현재 '잘못된 정보' 등록사항입니다.<br></br>담당자는
                            확인 부탁드립니다.
                        </p>
                    </div>
                    {/* 삭제 예정 */}
                    <div className="admin-contents">
                        <ul>
                            {reports?.map((report, index) => (
                                <ReceiveList
                                    key={index}
                                    title={report.title}
                                    userName={report.userName}
                                    content={report.content}
                                />
                            ))}
                        </ul>
                    </div>
                </article>
            )}
        </div>
    );
};

export default AdminPage;
