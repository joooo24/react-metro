import React from 'react'
import './DepartureArrivalTime.style.css'

const DepartureArrivalTime = () => {
    return (
        <div className='result-info-container'>
            <div className='da-time-main-container'>
                <div className='info-title'>
                    출발/도착 시간 선택
                </div>
                <div className='da-time-content-container'>
                    <div>
                        출발 오후 03:46
                    </div>
                    <div>
                        도착 오후 03:46
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartureArrivalTime