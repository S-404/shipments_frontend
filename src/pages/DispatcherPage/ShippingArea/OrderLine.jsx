import React from 'react';

const OrderLine = ({orderline, shippingArea}) => {
    const setClass = (order) => {

        let result = 'orders__order';

        switch (order.STATUS){
            case 0:
                result+=' orders__order_not-started';
                break;
            case 2:
                result+=' orders__order_completed';
                break;
            default:
                break;
        }

        if(order.IS_INPLACE) result = 'orders__order orders__order_in-place';

        result += shippingArea.filter(ord => ord.ORDER_NUM === order.ORDER_NUM).length > 1 ?
            ' orders__order_duplicated' : '';
        return result;
    }
    return (
        <div
            className={setClass(orderline)}>
            {orderline.ORDER_NUM}
        </div>
    );
};

export default OrderLine;