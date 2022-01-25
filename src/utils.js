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

export const isValidInput = (text) => {
    const notValid = '\'"`*;\\!@#$%^& ';
    for (let x = 0; x <= text.length; x++) {
        if (notValid.indexOf(text[x]) !== -1) {
            return false
        }
    }
    return true;
}

export const getHHArr = ()=>{
    let resultArr = [];
    for(let hh = 0; hh<=23; hh++){
        resultArr.push({name:pad(hh,2),value:pad(hh,2)})
    }
    return resultArr;
}
export  const getMMarr = ()=>{
    let resultArr = [];
    for(let mm = 0; mm<=59; mm+=15){
        resultArr.push({name:pad(mm,2),value:pad(mm,2)})
    }
    return resultArr;
}