import React from 'react';
import MySmallButton from "../../UI/button/mySmallButton";
import MyCheckBox from "../../UI/checkbox/myCheckBox";
import OrderStatusIcon from "./OrderStatusIcon";
import OrderNum from "./OrderNum";

const DynamicOrderLine = ({orderline, removeOrder, selectedPlace, shippingArea}) => {
    return (
        <div>
            {selectedPlace.IS_LOADING ?
                <div className="dynamic-order-line">
                    <OrderNum orderline={orderline} shippingArea={shippingArea}/>
                    <MyCheckBox/>
                </div>
                :
                <div className="dynamic-order-line">
                    <OrderStatusIcon orderline={orderline}/>
                    <OrderNum orderline={orderline} shippingArea={shippingArea}/>
                    <div className='order-line__button'>
                        <MySmallButton text='remove' onClick={() => removeOrder(orderline.ORDER_ID)}/>
                    </div>
                </div>
            }
        </div>
    );
};

export default DynamicOrderLine;