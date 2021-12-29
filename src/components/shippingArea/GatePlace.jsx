import React from 'react';
import OrderLine from "./OrderLine";
import {dateFormatHHMM} from "../../utils";

const GatePlace = ({place, shippingArea, ...props}) => {
    return (
        <div
            className="place"
            {...props}
        >
            <div className='place__place-header'>
                <div className='place__place-header place-header__div'>
                    <h1 className='place__place-header place-header__place-name'>
                        {place.PLACE}
                    </h1>
                    {place.IS_LOADING ?
                        <span className='place__place-header place-header__loading-status'>⇦🚚</span>
                        : null}
                    <span className='place__place-header place-header__last-upd'>
                    {place.MAX_DATE ? dateFormatHHMM(place.MAX_DATE) : null}
                </span>
                </div>
                <div className='place__place-header place-header__div'>
                    {place.TRUCK ?
                        <span className='place__place-header place-header__assigned-truck'>
                            {place.TRUCK}
                        </span>
                        : null}

                </div>
            </div>

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