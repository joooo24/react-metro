import { useState, useEffect } from 'react'
import './AdminPage.style.css'
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
    const navigate = useNavigate()
    const [adminAuth, setAdminAuth] = useState(false)

    useEffect(() => {
        const passKey = prompt("관리자 PassKey를 입력하세요.");
        if (passKey === '1234') {
            alert(`안녕하세요, 관리자님!`);
            setAdminAuth(true)
        } else {
            alert("PassKey가 일치하지 않습니다.");
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='admin-page'>
            {adminAuth &&
                <div>여기는 관리자 페이지입니다.</div>
            }
        </div>
    )
}

export default AdminPage