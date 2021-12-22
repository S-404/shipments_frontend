import React from 'react';

const OrderLine = ({orderline}) => {
    return (
        <div
            className="orderline">
            {orderline.ORDER_NUM}
        </div>
    );
};

export default OrderLine;