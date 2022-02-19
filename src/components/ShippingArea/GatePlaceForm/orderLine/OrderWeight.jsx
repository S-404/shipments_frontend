import React from 'react';

const OrderWeight = ({orderline}) => {
    return (
        <div className='dynamic-order-line__weight dynamic-order-line__col-2'>
            {orderline.ORDER_WEIGHT === null ? '' : Math.round(orderline.ORDER_WEIGHT * 10) / 10}
        </div>
    );
};

export default OrderWeight;