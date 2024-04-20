export const calTime = (date, arrival) => {
    // 시, 분, 초를 각각 두 자리로 맞추기 위한 함수
    const pad = (num) => num.toString().padStart(2, '0');
    const arrivalMinutes = Math.ceil(arrival / 60)

    // 시간과 분을 계산
    let hours = date.getHours();
    let minutes = date.getMinutes() + arrivalMinutes;

    // 분이 60 이상인 경우 시간을 조정
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);  // 추가되는 시간 계산
        minutes = minutes % 60;  // 60으로 나눈 나머지를 분으로 설정
    }

    // 시와 분을 두 자리 문자열로 변환
    const formattedHours = pad(hours);
    const formattedMinutes = pad(minutes);

    // "시:분" 형식으로 결과 반환
    return `${formattedHours}:${formattedMinutes}`;
}