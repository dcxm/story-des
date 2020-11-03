const dateFromTimestamp = (timestamp, callback) => {
    const date = new Date(timestamp)
    const addZero = (num) => (parseInt(num) < 10 ? `0${num}` : num)
    const dates = {
        getYear: () => date.getFullYear(),
        getMonth: () => addZero(date.getMonth() + 1),
        getDay: () => addZero(date.getDay()),
        getHours: () => addZero(date.getHours()),
        getMinutes: () => addZero(date.getMinutes()),
        getSeconds: () => addZero(date.getSeconds())
    }
    if (callback) callback(dates)
    else return `
        ${dates.getYear()}-${dates.getMonth() + 1}-${dates.getDay()} ${dates.getHours()}:${dates.getMinutes()}:${dates.getSeconds()}
        `
}

export default dateFromTimestamp