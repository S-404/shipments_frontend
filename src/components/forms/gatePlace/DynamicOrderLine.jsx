import React from 'react';
import StatusButton from "../../UI/button/statusButton";

const DynamicOrderLine = ({orderline, removeOrder, selectedPlace}) => {
    return (
        <div
            className="dynamic-orderline">
            {selectedPlace.IS_LOADING ?
                null
                :
                <StatusButton
                    text='remove'
                    onClick={() => removeOrder(orderline.ORDER_ID)}
                />
            }
            <span>{orderline.ORDER_NUM}</span>
        </div>
    );
};

export default DynamicOrderLine;