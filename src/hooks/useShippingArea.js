import {useMemo} from "react";


const useSortedShippingArea = (shippingArea) => {
    return useMemo(() => {
        if (shippingArea.length) {
            return [...shippingArea]
                .sort((a, b) => {
                        if (a.GATE < b.GATE) return -1;
                        if (a.GATE > b.GATE) return 1;

                        if (a.PLACE < b.PLACE) return 1;
                        if (a.PLACE > b.PLACE) return -1;

                        if (a.POSITION < b.POSITION) return -1;
                        if (a.POSITION > b.POSITION) return 1;

                        return 0;
                    }
                )
        }
        return shippingArea
    }, [shippingArea])
}

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


export const useFilteredSortedShippingArea = (shippingArea, selectedPlace) => {
    const filtered = useFilteredShippingArea(shippingArea, selectedPlace);
    return useSortedShippingArea(filtered);
}
