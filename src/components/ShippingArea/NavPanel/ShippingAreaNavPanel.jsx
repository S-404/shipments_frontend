import React from 'react';
import FindOrder from "./FindOrder/FindOrder";
import DeferredOrdersCounter from "./DeferredOrders/DeferredOrdersCounter";

const ShippingAreaNavPanel = ({shippingArea,setPlaceModal,setSelectedPlace,gatesPlaces}) => {
    return (
        <div className='dispatcher-form__dispatcher-nav-panel'>
            <FindOrder
                shippingArea={shippingArea}
                setPlaceModal={setPlaceModal}
                setSelectedPlace={setSelectedPlace}
                gatesPlaces={gatesPlaces}
            />
            <DeferredOrdersCounter/>
        </div>
    );
};

export default ShippingAreaNavPanel;