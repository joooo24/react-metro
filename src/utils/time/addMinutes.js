export const addMinutes = (time, minutesToAdd) => {
    // 시간과 분을 분리합니다.
    const [hours, minutes] = time.split(':').map(Number);
    // Date 객체를 생성합니다. 임의의 날짜를 사용하되, 시간과 분은 입력받은 값을 사용합니다.
    const date = new Date(2000, 0, 1, hours, minutes);
    // 입력받은 분을 Date 객체에 추가합니다.
    date.setMinutes(date.getMinutes() + minutesToAdd);

    // 결과를 "HH:MM" 형식으로 포매팅합니다.
    const formattedHours = date.getHours().toString().padStart(2, '0');
    const formattedMinutes = date.getMinutes().toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}