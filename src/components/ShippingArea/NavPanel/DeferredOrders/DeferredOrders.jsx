import React from 'react';

const DeferredOrders = ({deferred}) => {
    return (
        <div className='deferred-orders__order-list-form'>
            <h2 className='order-list-form__header'>Deferred Orders:</h2>
            <div className='order-list-form__orders'>
                {deferred.map(order=>(
                    <div
                        className='orders__order'
                        key={`deferred_${order.ORDER_NUM}_${order.ID}`}
                    >
                        {order.ORDER_NUM}
                    </div>
                ))}
            </div>
            <h3 className='order-list-form__counter'>Total {deferred.length} orders</h3>
        </div>
    );
};

export default DeferredOrders;