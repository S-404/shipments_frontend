const authState = {
    isAuth: true
}

export const isAuthReducer = (state = authState, action)=>{
    switch (action.type){
        case "SET_AUTH":
            return {...state, isAuth: action.value}
        default:
            return state
    }
}

