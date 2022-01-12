import React from 'react';

const OrderLine = ({orderline}) => {
    return (
        <div
            className="orders__order">
            {orderline.ORDER_NUM}
        </div>
    );
};

export default OrderLine;