export const timeToMinutes = (time) => {
    if (!time) {
        console.error("Invalid or missing time value");
        return 0;
    }
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
}