import React, {useEffect, useState} from 'react';
import DynamicOrderLine from "./orderLine/DynamicOrderLine";
import "./gatePlaceForm.scss"
import OrderListInputs from "./OrderListInputs";
import TruckLoadingInputs from "./TruckLoadingInputs";
import {useFilteredSortedShippingArea} from "../../../hooks/useShippingArea";
import MySmallButton from "../../UI/button/mySmallButton";
import LoadingTimePicker from "./LoadingTimePicker";


const GatePlaceForm = ({
                           selectedPlace,
                           shippingArea,
                           removeOrder,
                           removeOrders,
                           addOrder,
                           updatePlaceStatus,
                           updateTruck,
                           updateLoadingTime_HHMM,
                           updateOrderLoadingStatus,
                           increaseOrderPosition,
                           decreaseOrderPosition
                       }) => {

    const filteredShippingArea = useFilteredSortedShippingArea(shippingArea, selectedPlace)
    const [leftToLoad, setLeftToLoad] = useState(0)

    useEffect(() => {
        if (shippingArea.length && selectedPlace?.IS_LOADING) {
            setLeftToLoad(shippingArea
                .filter(order =>
                    order.PLACE_ID === selectedPlace.PLACE_ID &&
                    !order.IS_LOADED
                ).length)
        }
    }, [shippingArea, selectedPlace])

    return (
        <div className='gate-place-form'>
            <h1 className='gate-place-form__header'>{`GATE ${selectedPlace.GATE} - ${selectedPlace.PLACE}`}</h1>
            <LoadingTimePicker
                selectedPlace={selectedPlace}
                updateLoadingTime_HHMM={updateLoadingTime_HHMM}
            />
            <TruckLoadingInputs
                selectedPlace={selectedPlace}
                updateTruck={updateTruck}
                filteredShippingArea={filteredShippingArea}
                removeOrders={removeOrders}
                updatePlaceStatus={updatePlaceStatus}
            />
            <div className='gate-place-form__order-list'>
                {selectedPlace.IS_LOADING ?
                    <div className='order-list__info-div'>
                        {selectedPlace.IS_LOADING === 2 ?
                            <span className='info-div__info info-div__info_completed'>
                                LOADING IS COMPLETE
                            </span>
                            :
                            <span className='info-div__info info-div__info_in-process'>
                                TRUCK IS LOADING
                            </span>
                        }
                        <div className='info-div__header'>
                            <span className='header__col header__col-1'>ORDER_NUM</span>
                            <span className='header__col header__col-2'>WEIGHT</span>
                            <span className='header__col header__col-3'>IS_LOADED</span>
                        </div>
                    </div>
                    :
                    <OrderListInputs
                        selectedPlace={selectedPlace}
                        addOrder={addOrder}
                    />

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
                            increaseOrderPosition={increaseOrderPosition}
                            decreaseOrderPosition={decreaseOrderPosition}
                        />
                    ))}
                </div>
                {selectedPlace.IS_LOADING === 1 ?
                    <div className={'order-list__finish-loading-confirm '}>
                        <div className={
                            `finish-loading-confirm__buttons-div 
                            ${!leftToLoad ?
                                'finish-loading-confirm__buttons-div_is-ready'
                                : null}`}>
                            <MySmallButton
                                className='buttons-div__button'
                                onClick={() => updatePlaceStatus(selectedPlace.PLACE_ID, 2)}
                                text='finish loading'
                            />
                        </div>
                    </div>
                    :
                    selectedPlace.IS_LOADING === 2 ?
                        <div className={'order-list__clear-place-confirm '}>
                            <MySmallButton
                                className='buttons-div__button'
                                onClick={() => removeOrders(selectedPlace)}
                                text='clear this place'
                            />
                        </div>
                        : null
                }
            </div>
        </div>
    );
};

export default GatePlaceForm;
