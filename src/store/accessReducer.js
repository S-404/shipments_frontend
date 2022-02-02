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
        case "SET_USER_ACCESS":
            return {...state, ...action.value}
        default:
            return state
    }
}