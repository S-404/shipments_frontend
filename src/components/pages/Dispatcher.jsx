import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import ShipmentService from "../../api/ShipmentService";
import MyModal from "../UI/modal/myModal";
import GatePlaceForm from "../forms/gatePlace/GatePlaceForm";
import Gates from "../shippingArea/Gates";
import "../../styles/shippingArea.scss"

const Dispatcher = () => {
    const [shippingArea, setShippingArea] = useState([]);
    const [gates, setGates] = useState([]);
    const [gatesPlaces, setGatesPlaces] = useState([]);

    const [placeModal, setPlaceModal] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState({GATE_ID: 0, GATE: '00', PLACE: '00'});

    const [fetchShippingArea, isShippingAreaLoading, isShippingAreaError] = useFetching(
        async () => {
            const responseData = await ShipmentService.getData({
                query: 'orders/gates',
            });
            setShippingArea(responseData);
        }
    );

    const [fetchGatesPlacesList, isGatesPlacesLoading, isGatesPlacesError] = useFetching(async () => {
        const responseData = await ShipmentService.getData({
            query: 'gates',
        });
        setGatesPlaces(responseData);
    });

    useEffect(async () => {
        fetchShippingArea();
        fetchGatesPlacesList();
    }, []);

    useEffect(() => {
        let gates = gatesPlaces.reduce(function (arr, place) {
            if (arr.indexOf(place.GATE) === -1) {
                arr.push(place.GATE);
            }
            return arr;
        }, []);
        setGates(gates);
    }, [gatesPlaces]);


    const addOrder = (newOrderObj)=>{
        setShippingArea([...shippingArea, newOrderObj]);
    }

    const removeOrder = (orderID) => {
        if (!window.confirm('Order will be removed')) return;
        setShippingArea([...shippingArea.filter((order) => order.ORDER_ID !== orderID)]);
    }

    const removeOrders = (place)=>{
        if (!window.confirm('This place will be cleared')) return;
        console.log( shippingArea.filter(
            (order) => !(order.PLACE === place.PLACE && order.GATE === place.GATE)
        ))
        setShippingArea(
            [...shippingArea.filter(
                (order) => !(order.PLACE === place.PLACE && order.GATE === place.GATE)
            )]);
    }

    return (
        <div>
            <MyModal visible={placeModal} setVisible={setPlaceModal}>
                <GatePlaceForm
                    selectedPlace={selectedPlace}
                    shippingArea={shippingArea}
                    removeOrder={removeOrder}
                    removeOrders={removeOrders}
                    addOrder={addOrder}
                />
            </MyModal>
                <Gates
                    gates={gates}
                    gatesPlaces={gatesPlaces}
                    setSelectedPlace={setSelectedPlace}
                    setPlaceModal={setPlaceModal}
                    shippingArea={shippingArea}/>
        </div>
    );
};

export default Dispatcher;