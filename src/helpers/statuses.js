
export const  orderListOfPlace = (place, shippingArea) => {
    return Object.assign(
        shippingArea.filter(place_ =>
            place_.PLACE_ID === place.ID &&
            place_.ORDER_NUM !== null
        )
    )
}

export const isOrdersPickingInProcess = (orderList) => {
    let orderLines = orderList.length
    let completedOrders = orderList.filter(place_ => place_.STATUS === 2).length
    return orderLines && completedOrders
}


export const isOrdersInPlace = (orderList) => {
    let orderLines = orderList.length
    let inPlaceOrders = orderList.filter(place_ => place_.IS_INPLACE).length
    return orderLines && (orderLines === inPlaceOrders)
}

export const isOrdersNotStarted = (orderList) => {
    let orderLines = orderList.length
    let notStarted = orderList.filter(place_ => !place_.STATUS).length
    return orderLines && (notStarted)
}

export const truckStatusString = (place, shippingArea) => {

    let thisPlaceOrders = orderListOfPlace(place, shippingArea)



    switch (place.IS_LOADING) {
        case 0:
            if(isOrdersInPlace(thisPlaceOrders)) {
                return {className: 'ready', statusString: 'ready'}
            }
            if(isOrdersNotStarted(thisPlaceOrders)) {
                return  {
                    className:'waiting',
                    statusString: 'waiting: picking is not started'
                }
            }
            if(isOrdersPickingInProcess(thisPlaceOrders)) {
                return  {
                    className:'waiting_not-complete',
                    statusString: 'waiting: picking is not complete'
                }
            }
            return  {className:'waiting', statusString: 'waiting'}
        case 1:
            return  {className:'loading', statusString: 'loading'}
        case 2:
            return  {className:'completed', statusString: 'completed'}
        default:
            return  {className:'waiting', statusString: 'waiting'}
    }

}