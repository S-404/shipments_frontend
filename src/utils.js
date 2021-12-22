export const pad = (num, places) => String(num).padStart(places, '0');
export const dateFormatHHMM = (date) => {
    let d = new Date(date);
    return `${pad(d.getHours(),2)}:${pad(d.getMinutes(),2)}`
}