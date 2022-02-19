import React, {useMemo} from 'react';
import {orderListOfPlace,} from "../../helpers/orders";
import OrdersCounters from "./OrdersCounters";

const GatePlace = ({place, shippingArea, ...props}) => {

    const loadingTimeModification = useMemo (() => {
        let result = ''
        if (place.LOADING_TIME_HH) {
            let orderLines = shippingArea.filter(place_ => place_.PLACE_ID === place.ID && place_.ORDER_NUM !== null).length
            let completedOrders = shippingArea.filter(place_ => place_.PLACE_ID === place.ID && place_.STATUS === 2).length
            if (orderLines && (orderLines !== completedOrders)) {
                let HH = +place.LOADING_TIME_HH;
                let MM = +place.LOADING_TIME_MM;
                let d1 = new Date();
                d1.setHours(d1.getHours() + d1.getTimezoneOffset() / 60);
                let d2 = new Date();
                d2.setHours(HH + d2.getTimezoneOffset() / 60);
                d2.setMinutes(MM)
                if (d2 - d1 < 1000 * 60 * 30) {
                    result = ' indicators__loading-time_yellow';
                }
                if (d2 - d1 < 1000 * 60 * 20) {
                    result = ' indicators__loading-time_red'
                }
            } else if (orderLines === completedOrders && orderLines > 0) {
                result = ' indicators__loading-time_green'
            }
        }
        return result
    },[place,shippingArea])


    const loadingStatus = (status) => {
        switch (status) {
            case 1:
                return '🚚';
            case 2:
                return '🚚 ✓';
            default:
                return '';
        }
    }

    const placeModification = (status) => {
        switch (status) {
            case 1:
                return 'places__place_in-process';
            case 2:
                return 'places__place_completed';
            default:
                return '';
        }
    }

    const ordersList = useMemo(() => {
        return orderListOfPlace(place, shippingArea)
    },[place, shippingArea])

    return (
        <div className={`places__place ${placeModification(place.IS_LOADING)}`} {...props}>
            <div className='place__header'>
                <div className='header__indicators'>
                    <h1 className='indicators__name'>
                        {place.PLACE}
                    </h1>
                    <span className='indicators__loading-status'>{loadingStatus(place.IS_LOADING)}</span>
                    {place.IS_LOADING !== 2 ?
                        <span
                            className={`indicators__loading-time ${loadingTimeModification}`}>
                         {place.LOADING_TIME_HH ? `${place.LOADING_TIME_HH}:${place.LOADING_TIME_MM}` : null}
                    </span>
                        : null}
                </div>
                <div className='header__indicators'>
                    {place.TRUCK ?
                        <span className='indicators__assigned-truck'>
                            {place.TRUCK}
                        </span>
                        : null}
                </div>
            </div>
            <div className='place__orders'>
                {ordersList.length ?
                    <OrdersCounters
                        shippingArea={shippingArea}
                        ordersList={ordersList}
                    /> : null
                }
            </div>
        </div>
    );
};

export default GatePlace;