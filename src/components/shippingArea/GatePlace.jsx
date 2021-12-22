import React from 'react';
import OrderLine from "./OrderLine";

const GatePlace = ({place, shippingArea, ...props}) => {
    return (
        <div
            className="place"
            {...props}
        >
            <h1>{place.PLACE}</h1>
            {shippingArea
                .filter((order) => order.GATE_ID === place.ID)
                .map((orderline) => (
                    <OrderLine
                        key={`orderline_${orderline.ORDER_NUM}`}
                        orderline={orderline}
                    />
                ))}
        </div>
    );
};

export default GatePlace;