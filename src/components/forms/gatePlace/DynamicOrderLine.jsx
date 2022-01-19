import React from 'react';
import MySmallButton from "../../UI/button/mySmallButton";

const DynamicOrderLine = ({orderline, removeOrder, selectedPlace, shippingArea}) => {

    const setClass = (order) => {
        let result = 'order-line__order-num'
        result += shippingArea.filter(ord => ord.ORDER_NUM === order.ORDER_NUM).length > 1 ?
            ' order-line__order-num_duplicated' :
            '';
        return result;
    }

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
            <span className={setClass(orderline)}>{orderline.ORDER_NUM}</span>
            <span className='order-line__order-status'>{orderline.STATUS}</span>
        </div>
    );
};

export default DynamicOrderLine;