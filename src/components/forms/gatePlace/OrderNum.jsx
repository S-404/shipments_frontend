import React from 'react';

const OrderNum = ({orderline, shippingArea}) => {
    const isDuplicated = (orderNum) => {
        return shippingArea.filter(ord => ord.ORDER_NUM === orderNum).length > 1 ?
            'order-line__order-num order-line__order-num_duplicated' :
            'order-line__order-num'
    }
    return (
            <span
                className={isDuplicated(orderline.ORDER_NUM)}
            >
                {orderline.ORDER_NUM}
            </span>
    );
};

export default OrderNum;