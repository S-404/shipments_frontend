import React from 'react';
import MySmallButton from "../../../UI/button/mySmallButton";
import OrderStatusIcon from "./OrderStatusIcon";
import OrderNum from "./OrderNum";
import OrderWeight from "./OrderWeight";
import OrderLoadedStatus from "./OrderLoadedStatus";
import OrderPosition from "./OrderPostition";


const DynamicOrderLine = ({
                              orderline,
                              removeOrder,
                              selectedPlace,
                              shippingArea,
                              updateOrderLoadingStatus,
                              increaseOrderPosition,
                              decreaseOrderPosition,
                          }) => {
    function changeStatus(e) {
        if (selectedPlace.IS_LOADING === 1) {
            updateOrderLoadingStatus(orderline.ORDER_ID, e.target.checked)
        }
    }

    return (
        <div>
            {selectedPlace.IS_LOADING ?
                <div className="dynamic-order-line">
                    <OrderNum orderline={orderline} shippingArea={shippingArea}/>
                    <OrderWeight orderline={orderline}/>
                    <OrderLoadedStatus orderline={orderline} changeStatus={changeStatus}/>
                </div>
                :
                <div className="dynamic-order-line">
                    <OrderPosition
                        orderline={orderline}
                        increasePosition={increaseOrderPosition}
                        decreasePosition={decreaseOrderPosition}
                    />
                    <OrderStatusIcon orderline={orderline}/>
                    <OrderNum orderline={orderline} shippingArea={shippingArea}/>
                    <div className='dynamic-order-line__button'>
                        <MySmallButton text='remove' onClick={() => removeOrder(orderline.ORDER_ID)}/>
                    </div>
                </div>
            }
        </div>
    );
};

export default DynamicOrderLine;