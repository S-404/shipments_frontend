const accessState = {
    sa: false,
    admin: {
        read: false
    },
    dispatcher: {
        read: false,
        trucksLoad: false,
        trucksAssign: false,
        placesClear: false,
        ordersListManage: false,
    },
    picker: {
        read: false
    },
}

export const accessReducer = (state = accessState, action)=>{
    switch (action.type){
        case "SET_SA_ACCESS":
            return {...state, sa: action.value}
        case "SET_ADMIN_ACCESS":
            return {...state, admin:{...state.admin , read: action.value}}
        // case "SET_DISPATCHER_ACCESS":
        //     return {...state, dispatcher: action.value}
        // case "SET_PICKER_ACCESS":
        //     return {...state, picker: action.value}
        default:
            return state
    }
}