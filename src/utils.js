export const pad = (num, places) => String(num).padStart(places, '0');
export const dateFormatHHMM = (date) => {
    let d = new Date(date);
    d.setHours(d.getHours() + d.getTimezoneOffset() / 60)
    return `${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}`
}