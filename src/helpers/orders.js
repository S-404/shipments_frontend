export const orderListOfPlace = (place, shippingArea) => {
    return Object.assign(
        shippingArea.filter(place_ =>
            place_.PLACE_ID === place.ID &&
            place_.ORDER_NUM !== null
        )
    )
}

export const notStartedOrders = (orderList) => {
    return orderList.filter(order => !order.STATUS && !order.IS_INPLACE)
}

export const inPlaceOrders = (orderList) => {
    return orderList.filter(order => order.IS_INPLACE)
}

export const placeHasDuplicatedOrder = (orderList, shippingArea) => {

    for (let x = 0; x <= orderList.length; x++) {
        let order = orderList[x]?.ORDER_NUM
        if (order) {
            if (shippingArea
                .filter(ord => ord.ORDER_NUM === order)
                .length > 1) return true;
        }
    }
    return false;
}