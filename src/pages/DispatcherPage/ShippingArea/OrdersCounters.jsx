import React, {useMemo} from 'react';
import OrdersCounter from "./OrdersCounter";
import {inPlaceOrders, notStartedOrders, placeHasDuplicatedOrder} from "../../../helpers/orders";

const OrdersCounters = ({ordersList,shippingArea}) => {

    const notStartedQty = useMemo(() => {
        return notStartedOrders(ordersList).length
    },[ordersList])

    const inPlaceQty = useMemo(() => {
        return inPlaceOrders(ordersList).length
    },[ordersList])

    const hasDuplicate = useMemo(()=>{
        return placeHasDuplicatedOrder(ordersList,shippingArea)
    },[ordersList,shippingArea])

    return (
        <div className='orders__counters'>
            <OrdersCounter
                text={'orders: '}
                value={ordersList.length}
                modifier={hasDuplicate?'has-duplicate':''}
            />
            <OrdersCounter
                text={'in place: '}
                value={inPlaceQty}
                modifier={ordersList.length === inPlaceQty?'in-place':''}
            />
            {notStartedQty?
                <OrdersCounter
                    text={'not started:'}
                    value={notStartedQty}
                    modifier={'not-started'}
                />
                :null}
        </div>
    );
};

export default OrdersCounters;