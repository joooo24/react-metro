import { useState } from 'react'
import './ReportForm'
import { useNavigate } from 'react-router-dom';

const ReportForm = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted Title: ', title);
        console.log('Submitted Content: ', content);
        // 실제 신고 처리 로직을 추가할 수 있습니다.
        navigate('/')
        alert("신고가 접수되었습니다.")
    };
    return (
        <form className="report-form" onSubmit={handleSubmit}>
            <div>
                <div className='label'>신고 제목</div>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <div className='label'>신고 내용</div>
                <textarea
                    id="content"
                    rows="10"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">제출하기</button>
        </form>
    )
}

export default ReportForm