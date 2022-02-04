import React from 'react';

const OrderNum = ({orderline, shippingArea}) => {
    const setModification = (orderline) => {
        let result = 'dynamic-order-line__order-num dynamic-order-line__col-1 ';
        result += shippingArea.filter(ord => ord.ORDER_NUM === orderline.ORDER_NUM).length > 1 ?
            'dynamic-order-line__order-num dynamic-order-line__order-num_duplicated' : '';
        result+= orderline.IS_LOADED?' dynamic-order-line__order-num_loaded' : ''
        return result
    }

    return (
            <span
                className={setModification(orderline)}
            >
                {orderline.ORDER_NUM}
            </span>
    );
};

export default OrderNum;