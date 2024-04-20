import React from 'react'
import './AdminPage.style.css'
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
    const navigate = useNavigate()

    const passKey = prompt("관리자 PassKey를 입력하세요.");
    if (passKey == '1234') {
        alert(`안녕하세요, 관리자님!`);
    } else {
        alert("PassKey가 일치하지 않습니다.");
        navigate('/')
    }

    return (
        <div className='admin-page'>
            여기는 관리자 페이지입니다!
        </div>
    )
}

export default AdminPage