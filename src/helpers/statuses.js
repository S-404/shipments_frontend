
export const isOrdersCompleted = (place, shippingArea) => {
    let orderLines = shippingArea.filter(place_ => place_.PLACE_ID === place.ID && place_.ORDER_NUM !== null).length
    let completedOrders = shippingArea.filter(place_ => place_.PLACE_ID === place.ID && place_.STATUS === 2).length
    return orderLines && (orderLines === completedOrders)
}


export const statusString = (place, shippingArea) => {
    switch (place.IS_LOADING) {
        case 0:
            return isOrdersCompleted(place, shippingArea) ? 'ready' : 'waiting'
        case 1:
            return 'loading';
        case 2:
            return 'completed'
        default:
            return 'waiting';
    }
}