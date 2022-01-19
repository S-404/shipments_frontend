import React, {useEffect, useState} from 'react';
import DynamicOrderLine from "./DynamicOrderLine";
import MyInput from "../../UI/input/myInput";
import MySmallButton from "../../UI/button/mySmallButton";
import ToggleSwitch from "../../UI/checkbox/toggleSwitch";
import "../../../styles/gatePlaceForm.scss"
import {getHHArr, getMMarr, isValidInput} from "../../../utils";
import MySelect from "../../UI/select/mySelect";

const GatePlaceForm = ({
                           selectedPlace,
                           shippingArea,
                           removeOrder,
                           removeOrders,
                           addOrder,
                           updatePlaceStatus,
                           updateTruck,
                           updateLoadingTime_HHMM
                       }) => {
    const [newOrder, setNewOrder] = useState('')
    const [isMassUpload, setIsMassUpload] = useState(false)
    const [truck, setTruck] = useState('')
    const [loadingTime, setLoadingTime] = useState({HH: '00', MM: '00'})

    const addNewOrder = (orderNum) => {
        if (!orderNum.length) return;
        let newOrderObj = {
            PLACE_ID: selectedPlace.PLACE_ID,
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
            if (!value) return false;
            for (let x = 0; x < value.length; x++) {
                if (isNaN(value[x])) return false;
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
        updateTruck(truck, selectedPlace.PLACE_ID)
    }

    useEffect(() => {
        setTruck(selectedPlace.TRUCK ? selectedPlace.TRUCK : '')
        if (selectedPlace.LOADING_TIME_HH) {
            setLoadingTime({
                HH: selectedPlace.LOADING_TIME_HH,
                MM: selectedPlace.LOADING_TIME_MM,
            })

        }else {
            setLoadingTime({HH:'00',MM:'00'})
        }

    }, [selectedPlace])


    return (
        <div className='gate-place-form'>
            <div className='gate-place-form__header'>
                <h1 className='header__name'>
                    {`GATE ${selectedPlace.GATE} - ${selectedPlace.PLACE}`}
                </h1>
                <div className='header__loading-time-div'>
                    <span className='loading-time-div__header'>Loading Time</span>
                    <div className='loading-time-div__time-picker'>
                        <MySelect
                            className='time-picker__select'
                            onChange={
                                (selectedHH) => {
                                    setLoadingTime({...loadingTime, HH: selectedHH});
                                    updateLoadingTime_HHMM(selectedHH, loadingTime.MM, selectedPlace.PLACE_ID);
                                }
                            }
                            options={getHHArr()}
                            value={loadingTime.HH}
                        />
                        <span className={'time-picker__separator'}>:</span>
                        <MySelect
                            className={'time-picker__select'}
                            onChange={
                                (selectedMM) => {
                                    setLoadingTime({...loadingTime, MM: selectedMM});
                                    updateLoadingTime_HHMM(loadingTime.HH, selectedMM, selectedPlace.PLACE_ID)
                                }
                            }
                            options={getMMarr()}
                            value={loadingTime.MM}
                        />
                    </div>
                </div>
                <div className='header__assign-truck-div'>
                    <div className='assign-truck-div__input'>
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
                    <div className='assign-truck-div__button'>
                        <MySmallButton
                            onClick={assignTruck}
                            text='assign'
                        />
                    </div>
                </div>


                {selectedPlace.IS_LOADING ?
                    <div className='header__buttons-div'>
                        <MySmallButton
                            className='buttons-div__button'
                            onClick={() => updatePlaceStatus(selectedPlace)}
                            text='stop loading'
                        />
                        <MySmallButton
                            className='buttons-div__button'
                            onClick={() => {
                                removeOrders(selectedPlace);
                            }}
                            text='finish loading'
                        />
                    </div>
                    :
                    filteredShippingArea().length ?
                        <div className='header__buttons-div'>
                            <MySmallButton
                                className='buttons-div__button'
                                onClick={() => updatePlaceStatus(selectedPlace)}
                                text='start loading'
                            />
                        </div>
                        : null
                }
            </div>
            <div className='gate-place-form__body'>
                {selectedPlace.IS_LOADING ?
                    <span className='body__info'>
                     TRUCK IS LOADING
                    </span>
                    :
                    <div className='body__input-div'>
                        <ToggleSwitch
                            text='Mass Upload'
                            checked={isMassUpload}
                            onChange={() => setIsMassUpload(!isMassUpload)}
                        />
                        {isMassUpload ?
                            <div className='mass-upload-input'>
                                <MyInput
                                    placeholder='put order list (paste from excel)'
                                    value=''
                                    onChange={(e) => {
                                        massUpload(e.target.value)
                                    }}/>
                            </div>

                            :
                            <div className='body__single-order-div'>
                                <div className='single-order-div__input'>
                                    <MyInput
                                        labeltext='order'
                                        maxLength={9}
                                        placeholder='put order num'
                                        value={newOrder}
                                        onChange={(e) => {
                                            if (!isNaN(e.target.value)) setNewOrder(e.target.value)
                                        }}/>
                                </div>
                                <div className='single-order-div__button'>
                                    <MySmallButton onClick={() => addNewOrder(newOrder)} text='Add'/>
                                </div>
                            </div>
                        }


                    </div>

                }
                <div className='body__orderlines'>
                    {filteredShippingArea().map((orderline, index) => (
                        <DynamicOrderLine
                            key={`dynamicOrderline_${orderline.ORDER_NUM}_${index}`}
                            orderline={orderline}
                            removeOrder={removeOrder}
                            selectedPlace={selectedPlace}
                            shippingArea={shippingArea}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GatePlaceForm;
