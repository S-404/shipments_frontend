import React from 'react';

const OrdersCounter = ({text, value, modifier}) => {
    return (
        <div className={`counters__counter counters__counter_${modifier}`}>
            <span className='counter__text'>{text}</span>
            <span className='counter__value'>{value}</span>
        </div>
    );
};

export default OrdersCounter;