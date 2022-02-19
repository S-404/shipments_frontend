import React from 'react';

const OrderPosition = ({orderline,increasePosition,decreasePosition}) => {
    return (
        <div className="dynamic-order-line__position dynamic-order-line__col-0">
            <span className='position__number'>{orderline.POSITION || 0}</span>
            <div className='position__change-position'>
                <div
                    className='change-position__up'
                    onClick={()=>decreasePosition(orderline)}
                />
                <div
                    className='change-position__down'
                    onClick={()=>increasePosition(orderline)}
                />
            </div>
        </div>
    );
};

export default OrderPosition;