import React from 'react'
import './RequiredTime.style.css'

const RequiredTime = ({ totalMinutes }) => {
    return (
        <div className='result-info-container'>
            <div className='required-time-container'>
                <div className='info-title'>
                    소요시간
                </div>
                <div className='required-time-content'>
                    {totalMinutes}분
                </div>
            </div>
        </div>
    )
}

export default RequiredTime