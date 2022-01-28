import React from 'react';
import MySmallButton from "../../UI/button/mySmallButton";
import MyCheckBox from "../../UI/checkbox/myCheckBox";
import OrderStatusIcon from "./OrderStatusIcon";
import OrderNum from "./OrderNum";

const DynamicOrderLine = ({orderline, removeOrder, selectedPlace, shippingArea,updateOrderLoadingStatus}) => {
    return (
        <div>
            {selectedPlace.IS_LOADING ?
                <div className="dynamic-order-line">
                    <OrderNum orderline={orderline} shippingArea={shippingArea}/>
                    <div className='dynamic-order-line__loaded-status'>
                        <MyCheckBox
                            checked={!!orderline.IS_LOADED}
                            onChange={(e) => updateOrderLoadingStatus(orderline.ORDER_ID, e.target.checked)}
                        />
                    </div>

                </div>
                :
                <div className="dynamic-order-line">
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