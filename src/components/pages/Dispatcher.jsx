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
    const [selectedPlace, setSelectedPlace] = useState(
        {
            GATE_ID: 0,
            GATE: '00',
            PLACE: '00',
            IS_LOADING: false}
    );

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

    useEffect(async () =>
            await fetchShippingArea()
        , []);

    useEffect(async () => {
        if (shippingArea.length) {
            await fetchGatesPlacesList();
        }
    }, [shippingArea])

    useEffect(() => {
        let gates = gatesPlaces.reduce(function (arr, place) {
            if (arr.indexOf(place.GATE) === -1) {
                arr.push(place.GATE);
            }
            return arr;
        }, []);
        setGates(gates);
        let updSelectedPlace = gatesPlaces.filter(
            order => order.GATE_ID === selectedPlace.GATE_ID
        )
        if (updSelectedPlace.length) {
            setSelectedPlace({...selectedPlace, IS_LOADING: updSelectedPlace[0].IS_LOADING})
        }

    }, [gatesPlaces]);


    const addOrder = async (newOrderObj) => {
        const responseData = await ShipmentService.addData({
            query: 'orders',
            ORDER_NUM: newOrderObj.ORDER_NUM,
            GATE_ID: newOrderObj.GATE_ID,
        });
        let id = responseData[0].ID;
        if (id) {
            setShippingArea([...shippingArea, {...newOrderObj, ORDER_ID: id}]);
        }
    }

    const removeOrder = async (orderID) => {
        if (!window.confirm('Order will be removed')) return;
        const responseData = await ShipmentService.deleteData({
            query: 'orders/order',
            ID: orderID,
        });
        let id = responseData[0].ID
        if (id) {
            setShippingArea([...shippingArea.filter((order) => order.ORDER_ID !== id)]);
        }
    }

    const removeOrders = async (place) => {
        if (!window.confirm('This place will be cleared')) return;
        const responseData = await ShipmentService.deleteData({
            query: 'orders/gate',
            GATE_ID: place.GATE_ID,
        });
        let gateID = responseData[0].GATE_ID;
        if (gateID) {
            setShippingArea(
                [...shippingArea.filter(
                    (order) => !(order.GATE_ID === gateID)
                )]);
        }
    }

    const updatePlaceStatus = async (place) => {
        const responseData = await ShipmentService.updateData({
            query: 'gates/gate/status',
            ID: place.GATE_ID,
        });
        let gateID = responseData[0].ID;
        if (gateID) {
            let newGatesPlacesObj = Object.assign(gatesPlaces)
            newGatesPlacesObj.filter(
                gatePlace => gatePlace.ID === gateID
            )[0].IS_LOADING = responseData[0].IS_LOADING
            setGatesPlaces(newGatesPlacesObj);
            setSelectedPlace({...selectedPlace, IS_LOADING: responseData[0].IS_LOADING})
        }
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