import React from 'react';
import FindOrder from "./FindOrder/FindOrder";
import DeferredOrdersCounter from "./DeferredOrders/DeferredOrdersCounter";

const ShippingAreaNavPanel = ({shippingArea,setPlaceModal,setSelectedPlace}) => {
    return (
        <div className='dispatcher-form__dispatcher-nav-panel'>
            <FindOrder
                shippingArea={shippingArea}
                setPlaceModal={setPlaceModal}
                setSelectedPlace={setSelectedPlace}
            />
            <DeferredOrdersCounter/>
        </div>
    );
};

export default ShippingAreaNavPanel;