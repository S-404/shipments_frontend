import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import ShipmentService from "../../api/ShipmentService";
import MyModal from "../UI/modal/myModal";
import GatePlaceForm from "../dispatcherPage/forms/gatePlace/GatePlaceForm";
import Gates from "../dispatcherPage/shippingArea/Gates";
import "../../styles/dispatcherPage.scss"
import MyLoader from "../UI/loader/myLoader";
import {useInterval} from "../../hooks/useInterval";
import {useSelector} from "react-redux";
import GateHistoryForm from "../dispatcherPage/forms/history/GateHistoryForm";
import Trucks from "../dispatcherPage/shippingArea/Trucks";

const Dispatcher = () => {
    const user = useSelector(state => state.user)
    const access = useSelector(state => state.access)
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
    const [selectedGate, setSelectedGate] = useState({GATE_ID: 0})
    const [historyModal, setHistoryModal] = useState(false)

    const [fetchShippingArea, isShippingAreaLoading, isShippingAreaError] = useFetching(
        async () => {
            const responseData = await ShipmentService.queryData({}, 'orders/list', 'GET');
            setShippingArea(responseData);
        }
    );

    const [fetchGatesPlacesList, isGatesPlacesLoading, isGatesPlacesError] = useFetching(async () => {
        const responseData = await ShipmentService.queryData({}, 'places/list', 'GET');
        if (responseData.length) {
            setGatesPlaces(responseData.filter(place => place.ID !== null));
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
            if (!arr.filter((gate) => gate.GATE_ID === place.GATE_ID).length) {
                arr.push({GATE: place.GATE, GATE_ID: place.GATE_ID});
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
        if(!access?.dispatcher?.ordersListManage) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await ShipmentService.queryData({
            ORDER_NUM: newOrderObj.ORDER_NUM,
            PLACE_ID: newOrderObj.PLACE_ID,
            USER_ID: user.userid,
        }, 'orders/order', 'POST');
        let id = responseData[0].ORDER_ID;
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
        if(!access?.dispatcher?.ordersListManage) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await ShipmentService.queryData({
            ID: orderID,
            USER_ID: user.userid,
        }, 'orders/order', 'DELETE');
        let id = responseData[0].ORDER_ID
        if (id) {
            setShippingArea([...shippingArea.filter((order) => order.ORDER_ID !== id)]);
        }
    }

    const removeOrders = async (place) => {
        if(!access?.dispatcher?.ordersListManage) {
            alert(`you don't have permission access`)
            return
        }
        if (!window.confirm('This place will be cleared')) return;
        const responseData = await ShipmentService.queryData({
            PLACE_ID: place.PLACE_ID,
            USER_ID: user.userid,
        }, 'orders/place', 'DELETE');
        let gateID = responseData[0].PLACE_ID;
        if (gateID) {
            setShippingArea(
                [...shippingArea.filter(
                    (order) => !(order.PLACE_ID === gateID)
                )]);
        }
        await updatePlaceStatus(place.PLACE_ID, 0);
        await updateTruck('', place.PLACE_ID)
        setPlaceModal(false)

    }

    const updateOrderLoadingStatus = async (orderID, isLoaded) => {
        if(!access?.dispatcher?.trucksLoad) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await ShipmentService.queryData({
            ID: orderID,
            IS_LOADED: isLoaded,
        }, 'orders/order/loading-status', 'PUT');
        let id = responseData[0].ID
        if (id) {
            let tmpArr = Object.assign(shippingArea);
            if (tmpArr.length > 0) {
                let updRowIndex = tmpArr.findIndex((order) => order.ORDER_ID === id)
                tmpArr[updRowIndex].IS_LOADED = isLoaded;
            }
            setShippingArea([...tmpArr]);
        }
    }


    const updatePlaceStatus = async (PLACE_ID, IS_LOADING) => {
        if(!access?.dispatcher?.trucksLoad) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await ShipmentService.queryData({
            ID: PLACE_ID,
            IS_LOADING,
        }, 'places/status', 'PUT');
        let placeID = responseData[0].ID;
        if (placeID) {
            let newGatesPlacesObj = Object.assign(gatesPlaces)
            newGatesPlacesObj.filter(
                gatePlace => gatePlace.ID === placeID
            )[0].IS_LOADING = responseData[0].IS_LOADING
            setGatesPlaces(newGatesPlacesObj);
            setSelectedPlace({...selectedPlace, IS_LOADING: responseData[0].IS_LOADING})
        }
    }

    const updateTruck = async (truck, id) => {
        if(!access?.dispatcher?.trucksAssign) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await ShipmentService.queryData({
            ID: id,
            TRUCK: truck,
        }, 'places/truck', 'PUT');
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

    const updateLoadingTime_HHMM = async (HH, MM, ID) => {
        const responseData = await ShipmentService.queryData({
            ID, HH, MM,
        }, 'places/loadingtime', 'PUT');
        let placeID = responseData[0].ID;
        if (placeID) {
            let newGatesPlacesObj = Object.assign(gatesPlaces)
            // newGatesPlacesObj.filter(
            //     gatePlace => gatePlace.ID === placeID
            // )[0].IS_LOADING = responseData[0].IS_LOADING
            setGatesPlaces(newGatesPlacesObj);
            setSelectedPlace({
                ...selectedPlace,
                LOADING_TIME_HH: responseData[0].LOADING_TIME_HH,
                LOADING_TIME_MM: responseData[0].LOADING_TIME_MM,
            })
        }
    }

    if (!access?.dispatcher?.read) return ( <span>You don't have permission to access</span>)
    return (
        <div className='dispatcher-form'>
            {isShippingAreaLoading || isGatesPlacesLoading ?
                <div className='dispatcher-form__loader-div'><MyLoader/></div> : null}
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
                        updateLoadingTime_HHMM={updateLoadingTime_HHMM}
                        updateOrderLoadingStatus={updateOrderLoadingStatus}
                    />
                </MyModal>
                <MyModal visible={historyModal} setVisible={setHistoryModal}>
                    <GateHistoryForm
                        historyModal={historyModal}
                        setHistoryModal={setHistoryModal}
                        selectedGate={selectedGate}
                    />
                </MyModal>
                <Gates
                    gates={gates}
                    gatesPlaces={gatesPlaces}
                    setSelectedPlace={setSelectedPlace}
                    setPlaceModal={setPlaceModal}
                    shippingArea={shippingArea}
                    setSelectedGate={setSelectedGate}
                    setHistoryModal={setHistoryModal}
                    selectedGate={selectedGate}
                />
                <Trucks
                    gatesPlaces={gatesPlaces}
                    shippingArea={shippingArea}
                />
            </div>
        </div>
    );
}

export default Dispatcher;