import React, {useState} from 'react';
import DynamicOrderLine from "./DynamicOrderLine";
import MyInput from "../../UI/input/myInput";
import StatusButton from "../../UI/button/statusButton";

const GatePlaceForm = ({selectedPlace, shippingArea, removeOrder, removeOrders, addOrder, updatePlaceStatus}) => {
    const [newOrder, setNewOrder] = useState('')
    const addNewOrder = () => {
        if(!newOrder.length) return;
        let newOrderObj = {
            GATE_ID: selectedPlace.GATE_ID,
            GATE: selectedPlace.GATE,
            PLACE: selectedPlace.PLACE,
            ORDER_NUM: newOrder,
            ORDER_ID: Date.now(),
        }
        addOrder(newOrderObj);
        setNewOrder('')

    }
    return (
        <div>
            <div>
                <h1> {`GATE ${selectedPlace.GATE} - ${selectedPlace.PLACE}`} </h1>
                {selectedPlace.IS_LOADING ?
                    <div>
                        <button onClick={() => updatePlaceStatus(selectedPlace)}>stop loading</button>
                        <button onClick={() => {
                            removeOrders(selectedPlace);
                            updatePlaceStatus(selectedPlace);
                        }}>finish loading
                        </button>
                    </div>
                    :
                    <button onClick={() => updatePlaceStatus(selectedPlace)}>start loading</button>
                }
            </div>

            {selectedPlace.IS_LOADING ?
                <span>TRUCK IS LOADING </span>
                :
                <div>
                    <MyInput maxLength={9} placeholder='put order num' value={newOrder} onChange={(e) => {
                        if (!isNaN(e.target.value)) setNewOrder(e.target.value)
                    }}/>
                    <StatusButton onClick={() => addNewOrder()} text='Add'/>
                </div>

            }

            {shippingArea
                .filter((order) =>
                    order.GATE === selectedPlace.GATE &&
                    order.PLACE === selectedPlace.PLACE &&
                    order.ORDER_NUM !== null
                )
                .map((orderline, index) => (
                    <DynamicOrderLine
                        key={`dynamicOrderline_${orderline.ORDER_NUM}_${index}`}
                        orderline={orderline}
                        removeOrder={removeOrder}
                        selectedPlace={selectedPlace}
                    />
                ))}
        </div>
    );
};

export default GatePlaceForm;
