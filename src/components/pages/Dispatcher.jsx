import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import ShipmentService from "../../api/ShipmentService";
import MyModal from "../UI/modal/myModal";
import GatePlaceForm from "../forms/gatePlace/GatePlaceForm";
import Gates from "../shippingArea/Gates";
import "../../styles/dispatcherForm.scss"
import MyLoader from "../UI/loader/myLoader";
import {useInterval} from "../../hooks/useInterval";

const Dispatcher = () => {
    const [shippingArea, setShippingArea] = useState([]);
    const [gates, setGates] = useState([]);
    const [gatesPlaces, setGatesPlaces] = useState([]);

    const [placeModal, setPlaceModal] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(
        {
            PLACE_ID: 0,
            GATE: '00',
            PLACE: '00',
            IS_LOADING: false,
            TRUCK: ''
        }
    );

    const [fetchShippingArea, isShippingAreaLoading, isShippingAreaError] = useFetching(
        async () => {
            const responseData = await ShipmentService.getData({
                query: 'orders/list',
            });
            setShippingArea(responseData);
        }
    );

    const [fetchGatesPlacesList, isGatesPlacesLoading, isGatesPlacesError] = useFetching(async () => {
        const responseData = await ShipmentService.getData({
            query: 'places/list',
        });
        if(responseData.length){
            setGatesPlaces(responseData.filter(place=>place.ID !== null));
        }

    });

    useInterval(async () => {
        if (!isShippingAreaLoading) {
            await fetchShippingArea();
        }
    }, 8000)

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
            order => order.PLACE_ID === selectedPlace.PLACE_ID
        )
        if (updSelectedPlace.length) {
            setSelectedPlace({
                ...selectedPlace,
                IS_LOADING: updSelectedPlace[0].IS_LOADING,
            })
        }

    }, [gatesPlaces]);


    const addOrder = async (newOrderObj) => {
        const responseData = await ShipmentService.addData({
            query: 'orders/order',
            ORDER_NUM: newOrderObj.ORDER_NUM,
            PLACE_ID: newOrderObj.PLACE_ID,
        });
        let id = responseData[0].ID;
        if (id) {
            const newObj = responseData.map(
                (obj) => {
                    obj.GATE = newOrderObj.GATE;
                    obj.ORDER_ID = obj.ID;
                    obj.PLACE = newOrderObj.PLACE;
                    return obj
                }
                , {})
            setShippingArea([...shippingArea, ...newObj]);
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
            query: 'orders/place',
            PLACE_ID: place.PLACE_ID,
        });
        let gateID = responseData[0].PLACE_ID;
        if (gateID) {
            setShippingArea(
                [...shippingArea.filter(
                    (order) => !(order.PLACE_ID === gateID)
                )]);
        }
        await updatePlaceStatus(place);
        await updateTruck('', place.PLACE_ID)
        setPlaceModal(false)

    }

    const updatePlaceStatus = async (place) => {
        const responseData = await ShipmentService.updateData({
            query: 'places/status',
            ID: place.PLACE_ID,
            IS_LOADING: !place.IS_LOADING,
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

    const updateTruck = async (truck, id) => {
        const responseData = await ShipmentService.updateData({
            query: 'places/truck',
            ID: id,
            TRUCK: truck,
        });
        let gateID = responseData[0].ID;
        if (gateID) {
            let newGatesPlacesObj = Object.assign(gatesPlaces)
            newGatesPlacesObj.filter(
                gatePlace => gatePlace.ID === gateID
            )[0].TRUCK = responseData[0].TRUCK
            setGatesPlaces(newGatesPlacesObj);
            setSelectedPlace({...selectedPlace, TRUCK: responseData[0].TRUCK})
        }
    }
    return (
        <div className='dispatcher-form'>
            {isShippingAreaLoading || isGatesPlacesLoading ?
                <div className='dispatcher-form__loader-div'><MyLoader/></div>:null }
                <div className='dispatcher-form__shipping-area'>
                    <MyModal visible={placeModal} setVisible={setPlaceModal}>
                        <GatePlaceForm
                            selectedPlace={selectedPlace}
                            shippingArea={shippingArea}
                            removeOrder={removeOrder}
                            removeOrders={removeOrders}
                            addOrder={addOrder}
                            updatePlaceStatus={updatePlaceStatus}
                            updateTruck={updateTruck}
                        />
                    </MyModal>
                    <Gates
                        gates={gates}
                        gatesPlaces={gatesPlaces}
                        setSelectedPlace={setSelectedPlace}
                        setPlaceModal={setPlaceModal}
                        shippingArea={shippingArea}/>
                </div>
        </div>
    );
}

export default Dispatcher;