import {useMemo} from "react";

export const useFilteredShippingArea = (shippingArea, selectedPlace) => {
    return useMemo(() => {
        if (shippingArea.length) {
            return [...shippingArea]
                .filter((order) =>
                    order.GATE === selectedPlace.GATE &&
                    order.PLACE === selectedPlace.PLACE &&
                    order.ORDER_NUM !== null
                )
        }
        return shippingArea
    }, [shippingArea, selectedPlace])
}