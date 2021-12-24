import React, {useState} from 'react';
import DynamicOrderLine from "./DynamicOrderLine";
import MyInput from "../../UI/input/myInput";
import StatusButton from "../../UI/button/statusButton";
import ToggleSwitch from "../../UI/checkbox/toggleSwitch";
import "../../../styles/gatePlaceForm.scss"

const GatePlaceForm = ({selectedPlace, shippingArea, removeOrder, removeOrders, addOrder, updatePlaceStatus}) => {
    const [newOrder, setNewOrder] = useState('')
    const [isMassUpload, setIsMassUpload] = useState(false)


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
    return (
        <div className='gate-place-form'>
            <div className='gate-place-form__header'>
                <h1 className='gate-place-form__header header__name'>
                    {`GATE ${selectedPlace.GATE} - ${selectedPlace.PLACE}`}
                </h1>
                {selectedPlace.IS_LOADING ?
                    <div className='gate-place-form__header header__buttons-div'>
                        <button
                            className='header__buttons-div buttons-div__button'
                            onClick={() => updatePlaceStatus(selectedPlace)}>
                            stop loading
                        </button>
                        <button
                            className='header__buttons-div buttons-div__button'
                            onClick={() => {
                                removeOrders(selectedPlace);
                            }}>
                            finish loading
                        </button>
                    </div>
                    :
                    filteredShippingArea().length ?
                        <div className='gate-place-form__header header__buttons-div'>
                            <button
                                className='header__buttons-div buttons-div__button'
                                onClick={() => updatePlaceStatus(selectedPlace)}
                            >
                                start loading
                            </button>
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
                            <div className='body__input-div single-order-input'>
                                <MyInput
                                    maxLength={9}
                                    placeholder='put order num'
                                    value={newOrder} onChange={(e) => {
                                    if (!isNaN(e.target.value)) setNewOrder(e.target.value)
                                }}/>
                                <StatusButton onClick={() => addNewOrder(newOrder)} text='Add'/>
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
