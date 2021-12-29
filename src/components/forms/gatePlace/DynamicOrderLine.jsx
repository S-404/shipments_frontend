import React from 'react';
import MySmallButton from "../../UI/button/mySmallButton";

const DynamicOrderLine = ({orderline, removeOrder, selectedPlace}) => {
    return (
        <div
            className="dynamic-orderline">
            {selectedPlace.IS_LOADING ?
                null
                :
                <MySmallButton
                    text='remove'
                    onClick={() => removeOrder(orderline.ORDER_ID)}
                />
            }
            <span>{orderline.ORDER_NUM}</span>
        </div>
    );
};

export default DynamicOrderLine;