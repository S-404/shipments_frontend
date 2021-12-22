import React, {useState} from 'react';
import DynamicOrderLine from "./DynamicOrderLine";
import MyInput from "../../UI/input/myInput";
import StatusButton from "../../UI/button/statusButton";

const GatePlaceForm = ({selectedPlace, shippingArea, removeOrder, removeOrders,addOrder}) => {
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
            <h1>
                <button onClick={() => removeOrders(selectedPlace)}>⇦🚚</button>
                {`GATE ${selectedPlace.GATE} - ${selectedPlace.PLACE}`}</h1>

            <MyInput placeholder='put order num' value={newOrder} onChange={(e) => setNewOrder(e.target.value)}/>
            <StatusButton onClick={() => addNewOrder()} text='Add'/>

            {shippingArea
                .filter((order) =>
                order.GATE === selectedPlace.GATE &&
                    order.PLACE === selectedPlace.PLACE &&
                    order.ORDER_NUM !== null
                )
                .map((orderline,index) => (
                    <DynamicOrderLine
                        key={`dynamicOrderline_${orderline.ORDER_NUM}_${index}`}
                        orderline={orderline}
                        removeOrder={removeOrder}
                    />

                ))}
        </div>
    );
};

export default GatePlaceForm;
