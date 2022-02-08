import React from 'react';
import MySmallButton from "../../../components/UI/button/mySmallButton";
import MyCheckBox from "../../../components/UI/checkbox/myCheckBox";
import OrderStatusIcon from "./OrderStatusIcon";
import OrderNum from "./OrderNum";

const DynamicOrderLine = ({orderline, removeOrder, selectedPlace, shippingArea, updateOrderLoadingStatus}) => {
    function changeStatus (e){
        if (selectedPlace.IS_LOADING === 1) {
            updateOrderLoadingStatus(orderline.ORDER_ID, e.target.checked)
        }
    }
    return (
        <div>
            {selectedPlace.IS_LOADING ?
                <div className="dynamic-order-line">
                    <OrderNum orderline={orderline} shippingArea={shippingArea}/>
                    <div className='dynamic-order-line__weight dynamic-order-line__col-2'>
                        {orderline.ORDER_WEIGHT === null ? '' : Math.round(orderline.ORDER_WEIGHT * 10) / 10}
                    </div>
                    <div className='dynamic-order-line__loaded-status dynamic-order-line__col-3'>
                        <MyCheckBox
                            checked={!!orderline.IS_LOADED}
                            onChange={(e) => changeStatus(e)}
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