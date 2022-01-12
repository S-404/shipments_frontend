import React from 'react';
import MySmallButton from "../../UI/button/mySmallButton";

const DynamicOrderLine = ({orderline, removeOrder, selectedPlace}) => {
    return (
        <div
            className="dynamic-order-line">
            <div className='order-line__button'>
            {selectedPlace.IS_LOADING ?
                null
                :
                <MySmallButton
                    text='remove'
                    onClick={() => removeOrder(orderline.ORDER_ID)}
                />
            }
            </div>
            <span className='order-line__order-num'>{orderline.ORDER_NUM}</span>
            <span className='order-line__order-status'>{orderline.STATUS}</span>
        </div>
    );
};

export default DynamicOrderLine;