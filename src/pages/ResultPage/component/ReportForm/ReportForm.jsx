import { useState } from "react";
import "./ReportForm.style.css";
import sorry from "../../../../assets/images/sorry.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToReports } from "../../../../store/reportsSlice";

const ReportForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [userName, setUserName] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const reportData = {
            title: title,
            userName: userName,
            content: content,
        }
        dispatch(addToReports(reportData))
        console.log("Submitted Title: ", title);
        console.log("Submitted Content: ", content);
        // 실제 신고 처리 로직을 추가할 수 있습니다.
        navigate("/");
        alert("신고가 접수되었습니다.");
    };
    return (
        <div className="report-form-wrapper">
            <div className="report-form-sorry">
                <img src={sorry} alt="sorry"></img>
                <p>
                    좋은 서비스를 제공하지 못해 죄송합니다.
                    <br />더 나은 서비스 제공을 위해 <br />
                    고객님의 의견을 적극 반영하겠습니다. <br />
                    감사합니다.
                </p>
            </div>
            <form className="report-form" onSubmit={handleSubmit}>
                <div>
                    <div className="label">신고 제목</div>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div className="label">이름</div>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div className="label">정보 입력</div>
                    <textarea
                        id="content"
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">보내기</button>
            </form>
        </div>
    );
};

export default ReportForm;
