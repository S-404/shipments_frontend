import React from 'react';
import DynamicOrderLine from "./DynamicOrderLine";
import "../../../styles/gatePlaceForm.scss"
import OrderListInputs from "./OrderListInputs";
import TruckLoadingInputs from "./TruckLoadingInputs";
import {useFilteredShippingArea} from "../../../hooks/useShippingArea";


const GatePlaceForm = ({
                           selectedPlace,
                           shippingArea,
                           removeOrder,
                           removeOrders,
                           addOrder,
                           updatePlaceStatus,
                           updateTruck,
                           updateLoadingTime_HHMM,
                           updateOrderLoadingStatus
                       }) => {

    const filteredShippingArea = useFilteredShippingArea(shippingArea, selectedPlace)

    return (
        <div className='gate-place-form'>
            <TruckLoadingInputs
                selectedPlace={selectedPlace}
                updateLoadingTime_HHMM={updateLoadingTime_HHMM}
                updateTruck={updateTruck}
                filteredShippingArea={filteredShippingArea}
                removeOrders={removeOrders}
                updatePlaceStatus={updatePlaceStatus}
            />
            <div className='gate-place-form__order-list'>
                {selectedPlace.IS_LOADING ?
                    <div>
                    <span className='order-list__info'>TRUCK IS LOADING</span>
                    <div className='order-list__header'><span>ORDER_NUM</span> <span>IS_LOADED</span></div>
                    </div>
                    :
                    <OrderListInputs selectedPlace={selectedPlace} addOrder={addOrder}/>

                }

                <div className='order-list__orderlines'>
                    {filteredShippingArea.map((orderline, index) => (
                        <DynamicOrderLine
                            key={`dynamicOrderline_${orderline.ORDER_NUM}_${index}`}
                            orderline={orderline}
                            removeOrder={removeOrder}
                            selectedPlace={selectedPlace}
                            shippingArea={shippingArea}
                            updateOrderLoadingStatus={updateOrderLoadingStatus}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GatePlaceForm;
