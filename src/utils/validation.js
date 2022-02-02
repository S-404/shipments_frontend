export const isValidInput = (text) => {
    const notValid = '\'"`*;\\!@#$%^& ';
    for (let x = 0; x <= text.length; x++) {
        if (notValid.indexOf(text[x]) !== -1) {
            return false
        }
    }
    return true;
}

export const isValidPassword = (text) => {
    if(!text.length) return false
    const notValid = '\'"`\\ ';
    for (let x = 0; x <= text.length; x++) {
        if (notValid.indexOf(text[x]) !== -1) {
            return false
        }
    }
    return true;
}