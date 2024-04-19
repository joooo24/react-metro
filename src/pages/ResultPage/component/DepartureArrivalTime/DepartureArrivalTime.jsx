import React from 'react'
import './DepartureArrivalTime.style.css'

const DepartureArrivalTime = ({ departTime }) => {

    // 시간 부분만 추출
    const hour = parseInt(departTime.split(':')[0], 10);

    // 오전/오후 구분
    const timePeriod = hour >= 12 && hour < 24 ? "오후" : "오전";

    // 실제 표시될 시간 조정 (12시간제)
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    const formattedTime = `${hour}:${departTime.split(':')[1]}`;
    console.log("hour", displayHour)

    return (
        <div className='result-info-container'>
            <div className='da-time-main-container'>
                <div className='info-title'>
                    출발/도착 시간 선택
                </div>
                <div className='da-time-content-container'>
                    <div>
                        출발 {timePeriod} {departTime}
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