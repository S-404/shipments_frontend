import React from 'react';

const OrderLine = ({orderline}) => {
    return (
        <div
            className={orderline.STATUS === 'COMPLETED' ? "orders__order orders__order_completed" : "orders__order"}>
            {orderline.ORDER_NUM}
        </div>
    );
};

export default OrderLine;