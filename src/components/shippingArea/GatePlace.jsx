import React from 'react';
import OrderLine from "./OrderLine";
import {dateFormatHHMM} from "../../utils";

const GatePlace = ({place, shippingArea, ...props}) => {

    const loadingTimeModification = () => {
        let result = ''
        if (place.LOADING_TIME_HH) {
            let orderLines = shippingArea.filter(place_ => place_.PLACE_ID === place.ID && place_.ORDER_NUM !== null).length
            let completedOrders = shippingArea.filter(place_ => place_.PLACE_ID === place.ID && place_.STATUS === 'COMPLETED').length
            if (orderLines && (orderLines !== completedOrders)) {
                let HH = +place.LOADING_TIME_HH;
                let MM = +place.LOADING_TIME_MM;
                let d1 = new Date();
                d1.setHours(d1.getHours() + d1.getTimezoneOffset() / 60);
                let d2 = new Date();
                d2.setHours(HH + d2.getTimezoneOffset() / 60);
                d2.setMinutes(MM)
                if (d2 - d1 < 1000 * 60 * 30) {
                    result = ' indicators__loading-time_yellow';
                }
                if (d2 - d1 < 1000 * 60 * 20) {
                    result = ' indicators__loading-time_red'
                }
            }else if(orderLines === completedOrders && orderLines>0){
                result = ' indicators__loading-time_green'
            }


        }
        return result
    }

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
                    {/*<span className='indicators__last-upd'>*/}
                    {/*{place.MAX_DATE ? dateFormatHHMM(place.MAX_DATE) : null}*/}
                    {/*</span>*/}
                    <span
                        className={`indicators__loading-time ${loadingTimeModification()}`}>
                         {place.LOADING_TIME_HH ? `${place.LOADING_TIME_HH}:${place.LOADING_TIME_MM}` : null}
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
                    .filter((order) => order.PLACE_ID === place.ID)
                    .map((orderline) => (
                        <OrderLine
                            key={`orderline_${orderline.ORDER_NUM}`}
                            orderline={orderline}
                            shippingArea={shippingArea}
                        />
                    ))}
            </div>
        </div>
    );
};

export default GatePlace;