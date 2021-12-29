import React, {useEffect, useState} from 'react';
import DynamicOrderLine from "./DynamicOrderLine";
import MyInput from "../../UI/input/myInput";
import MySmallButton from "../../UI/button/mySmallButton";
import ToggleSwitch from "../../UI/checkbox/toggleSwitch";
import "../../../styles/gatePlaceForm.scss"
import {isValidInput} from "../../../utils";

const GatePlaceForm = ({
                           selectedPlace,
                           shippingArea,
                           removeOrder,
                           removeOrders,
                           addOrder,
                           updatePlaceStatus,
                           updateTruck
                       }) => {
    const [newOrder, setNewOrder] = useState('')
    const [isMassUpload, setIsMassUpload] = useState(false)
    const [truck, setTruck] = useState('')

    const addNewOrder = (orderNum) => {
        if (!orderNum.length) return;
        let newOrderObj = {
            GATE_ID: selectedPlace.GATE_ID,
            GATE: selectedPlace.GATE,
            PLACE: selectedPlace.PLACE,
            ORDER_NUM: orderNum,
            ORDER_ID: Date.now(),
        }
        addOrder(newOrderObj);
        setNewOrder('')
    }
    const filteredShippingArea = () => {
        return shippingArea
            .filter((order) =>
                order.GATE === selectedPlace.GATE &&
                order.PLACE === selectedPlace.PLACE &&
                order.ORDER_NUM !== null
            )
    }

    const massUpload = (str) => {
        let checkOrderListArr = str.split(' ')
        let orderListArr = []
        const isValid = (value) => {
            if(!value) return false;
            for (let x = 0; x < value.length; x++) {
                if (isNaN(value[x]))return false;
            }
            return true;
        }

        for (let x = 0; x < Math.min(50, checkOrderListArr.length); x++) {
            if (isValid(checkOrderListArr[x])) {
                orderListArr.push(checkOrderListArr[x])
            }
        }

       if (orderListArr.length) addNewOrder(orderListArr.join(' '))

    }

    const assignTruck = () => {
            updateTruck(truck, selectedPlace.GATE_ID)
    }

    useEffect(() => {
        setTruck(selectedPlace.TRUCK ? selectedPlace.TRUCK : '')
    }, [selectedPlace])


    return (
        <div className='gate-place-form'>
            <div className='gate-place-form__header'>
                <h1 className='gate-place-form__header header__name'>
                    {`GATE ${selectedPlace.GATE} - ${selectedPlace.PLACE}`}
                </h1>
                <div className='gate-place-form__header header__assign-truck-div'>
                    <div className='header__assign-truck-div assign-truck-div__input'>
                        <MyInput
                            maxLength={20}
                            placeholder='put truck num'
                            value={truck}
                            onChange={(e) => {
                                if (isValidInput(e.target.value)) setTruck(e.target.value)
                            }}
                            labeltext='truck'
                        />
                    </div>
                    <div className='header__assign-truck-div assign-truck-div__button'>
                        <MySmallButton
                            onClick={assignTruck}
                            text='assign'
                        />
                    </div>

                </div>
                {selectedPlace.IS_LOADING ?
                    <div className='gate-place-form__header header__buttons-div'>
                        <MySmallButton
                            className='header__buttons-div buttons-div__button'
                            onClick={() => updatePlaceStatus(selectedPlace)}
                            text='stop loading'
                        />
                        <MySmallButton
                            className='header__buttons-div buttons-div__button'
                            onClick={() => {
                                removeOrders(selectedPlace);
                            }}
                            text='finish loading'
                        />
                    </div>
                    :
                    filteredShippingArea().length ?
                        <div className='gate-place-form__header header__buttons-div'>
                            <MySmallButton
                                className='header__buttons-div buttons-div__button'
                                onClick={() => updatePlaceStatus(selectedPlace)}
                                text='start loading'
                            />
                        </div>
                        : null
                }
            </div>
            <div className='gate-place-form__body'>
                {selectedPlace.IS_LOADING ?
                    <span
                        className='gate-place-form__body body__info'
                    >
                    TRUCK IS LOADING
                </span>
                    :
                    <div className='gate-place-form__body body__input-div'>
                        <ToggleSwitch
                            text='Mass Upload'
                            checked={isMassUpload}
                            onChange={() => setIsMassUpload(!isMassUpload)}
                        />
                        {isMassUpload ?
                            <div className='body__input-div mass-upload-input'>
                                <MyInput
                                    placeholder='put order list (paste from excel)'
                                    value=''
                                    onChange={(e) => {
                                        massUpload(e.target.value)
                                    }}/>
                            </div>

                            :
                            <div className='body__input-div body__single-order-div'>
                                <div className='body__single-order-div single-order-div__input'>
                                    <MyInput
                                        labeltext='order'
                                        maxLength={9}
                                        placeholder='put order num'
                                        value={newOrder}
                                        onChange={(e) => {
                                            if (!isNaN(e.target.value)) setNewOrder(e.target.value)
                                        }}/>
                                </div>
                                <div className='body__single-order-div single-order-div__button'>
                                    <MySmallButton onClick={() => addNewOrder(newOrder)} text='Add'/>
                                </div>
                            </div>
                        }


                    </div>

                }
                <div className='gate-place-form__body body__orderlines'>
                    {filteredShippingArea().map((orderline, index) => (
                        <DynamicOrderLine
                            key={`dynamicOrderline_${orderline.ORDER_NUM}_${index}`}
                            orderline={orderline}
                            removeOrder={removeOrder}
                            selectedPlace={selectedPlace}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GatePlaceForm;
