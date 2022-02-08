export const pad = (num, places) => String(num).padStart(places, '0');
export const dateFormatHHMM = (date) => {
    let d = new Date(date);
    d.setHours(d.getHours() + d.getTimezoneOffset() / 60)
    return `${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}`
}

export const dateFormatDDMMyyyyHHmm = (date)=> {
    let d = new Date(date);
    d.setHours(d.getHours() + d.getTimezoneOffset() / 60)
    let DD = pad(d.getDate(),2) ;
    let MM = pad(d.getMonth()+1,2) ;
    let yyyy = d.getFullYear();
    let HH = pad(d.getHours(), 2);
    let mm = pad(d.getMinutes(), 2);

    return `${DD}-${MM}-${yyyy} ${HH}:${mm}`
}

