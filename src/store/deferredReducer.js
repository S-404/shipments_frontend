const deferredState = [];

export const deferredReducer = (state = deferredState, action)=>{
    switch (action.type){
        case "SET_DEFERRED":
            return [...action.value]
        default:
            return state
    }
}
