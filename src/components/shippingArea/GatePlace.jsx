import React from 'react';
import OrderLine from "./OrderLine";
import {dateFormatHHMM} from "../../utils";

const GatePlace = ({place, shippingArea, ...props}) => {
    return (
        <div
            className="places__place"
            {...props}
        >
            <div className='place__header'>
                <div className='header__indicators'>
                    <h1 className='indicators__name'>
                        {place.PLACE}
                    </h1>
                    {place.IS_LOADING ?
                        <span className='indicators__loading-status'>⇦🚚</span>
                        : null}
                    <span className='indicators__last-upd'>
                    {place.MAX_DATE ? dateFormatHHMM(place.MAX_DATE) : null}
                </span>
                </div>
                <div className='header__indicators'>
                    {place.TRUCK ?
                        <span className='indicators__assigned-truck'>
                            {place.TRUCK}
                        </span>
                        : null}
                </div>
            </div>
            <div className='place__orders'>
            {shippingArea
                .filter((order) => order.GATE_ID === place.ID)
                .map((orderline) => (
                    <OrderLine
                        key={`orderline_${orderline.ORDER_NUM}`}
                        orderline={orderline}
                    />
                ))}
            </div>
        </div>
    );
};

export default GatePlace;