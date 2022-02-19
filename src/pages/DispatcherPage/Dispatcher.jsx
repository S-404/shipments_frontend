import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import OrdersService from "../../api/OrdersService";
import MyModal from "../../components/UI/modal/myModal";
import GatePlaceForm from "../../components/ShippingArea/GatePlaceForm/GatePlaceForm";
import Gates from "../../components/ShippingArea/Gates";
import "./dispatcherPage.scss"
import MyLoader from "../../components/UI/loader/myLoader/myLoader";
import {useInterval} from "../../hooks/useInterval";
import {useSelector} from "react-redux";
import GateHistoryForm from "../../components/History/GateHistoryForm";
import Trucks from "../../components/Trucks/Trucks";
import ShipmentAreaService from "../../api/ShipmentAreaService";
import ShippingAreaNavPanel from "../../components/ShippingArea/NavPanel/ShippingAreaNavPanel";

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

    const [fetchShippingArea, isShippingAreaLoading] = useFetching(
        async () => {
            const responseData = await OrdersService.getOrdersList();
            setShippingArea(responseData);
        }
    );

    const [fetchGatesPlacesList, isGatesPlacesLoading] = useFetching(async () => {
        const responseData = await ShipmentAreaService.getGatesPlaces();
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
        if (!access?.dispatcher?.ordersListManage) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await OrdersService.addOrder({
            ORDER_NUM: newOrderObj.ORDER_NUM,
            PLACE_ID: newOrderObj.PLACE_ID,
            USER_ID: user.userid,
        });

        let id = responseData[0].ORDER_ID;
        if (id) {
            const newObj = responseData.map(
                (obj) => {
                    obj.GATE = newOrderObj.GATE;
                    obj.ORDER_ID = id;
                    obj.PLACE = newOrderObj.PLACE;
                    return obj
                }
                , {})
            setShippingArea([...shippingArea, ...newObj]);
        }
    }



    const removeOrder = async (orderID) => {
        if (!access?.dispatcher?.ordersListManage) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await OrdersService.removeOrder({
            ID: orderID,
            USER_ID: user.userid,
        });
        let id = responseData[0].ORDER_ID
        if (id) {
            setShippingArea([...shippingArea.filter((order) => order.ORDER_ID !== id)]);
        }
    }

    const removeOrders = async (place) => {
        if (!access?.dispatcher?.ordersListManage) {
            alert(`you don't have permission access`)
            return
        }
        if (!window.confirm('This place will be cleared')) return;
        const responseData = await OrdersService.removeOrders({
            PLACE_ID: place.PLACE_ID,
            USER_ID: user.userid,
        });
        let gateID = responseData[0].PLACE_ID;
        if (gateID) {
            setShippingArea(
                [...shippingArea.filter(
                    (order) => !(order.PLACE_ID === gateID)
                )]);
        }
        await updatePlaceStatus(place.PLACE_ID, 0);
        setPlaceModal(false)

    }

    const updateOrderLoadingStatus = async (orderID, isLoaded) => {
        if (!access?.dispatcher?.trucksLoad) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await OrdersService.updOrderLoadingStatus({
            ID: orderID,
            IS_LOADED: isLoaded,
        });
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
        if (!access?.dispatcher?.trucksLoad) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await ShipmentAreaService.updPlaceLoadingStatus({
            ID: PLACE_ID,
            IS_LOADING,
        });
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
        if (!access?.dispatcher?.trucksAssign) {
            alert(`you don't have permission access`)
            return
        }
        const responseData = await ShipmentAreaService.updPlaceAssignedTruck({
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

    const updateLoadingTime_HHMM = async (HH, MM, ID) => {
        const responseData = await ShipmentAreaService.updPlaceLoadingTime({
            ID, HH, MM,
        });
        let placeID = responseData[0].ID;
        if (placeID) {
            let newGatesPlacesObj = Object.assign(gatesPlaces)
            setGatesPlaces(newGatesPlacesObj);
            setSelectedPlace({
                ...selectedPlace,
                LOADING_TIME_HH: responseData[0].LOADING_TIME_HH,
                LOADING_TIME_MM: responseData[0].LOADING_TIME_MM,
            })
        }
    }

    const [changeOrderPosition,] = useFetching(async (orderline, increase) => {

            let currPositionOrder = orderline.ORDER_ID;
            let prevPosition = orderline.POSITION||0;
            let nextPosition = orderline.POSITION + increase;

            let currentPlace = Object.assign(
                shippingArea.filter(order =>
                    order.GATE_ID === orderline.GATE_ID &&
                    order.PLACE_ID === orderline.PLACE_ID));

            let nextPositionOrder = currentPlace
                .filter(order => order.POSITION === nextPosition)[0]?.ORDER_ID;


            const responseDataNext = await OrdersService.updOrderPosition({
                ID: currPositionOrder,
                POSITION: nextPosition
            });

            let tmpArr = Object.assign(shippingArea);

            if (responseDataNext[0]?.ID && tmpArr.length > 0) {
                let updRowIndex = tmpArr
                    .findIndex((order) => order.ORDER_ID === orderline.ORDER_ID);
                tmpArr[updRowIndex].POSITION = orderline.POSITION + increase;
            }

            if(nextPositionOrder){
                const responseDataPrev = await OrdersService.updOrderPosition({
                    ID: nextPositionOrder,
                    POSITION: prevPosition
                })
                if (responseDataPrev[0]?.ID && tmpArr.length > 0) {
                    let nextRowIndex = tmpArr
                        .findIndex((order) => order.ORDER_ID === nextPositionOrder);
                    tmpArr[nextRowIndex].POSITION = tmpArr[nextRowIndex].POSITION - increase;
                }
            }

            setShippingArea([...tmpArr]);
        })


    const increaseOrderPosition = async (orderline) => {
        await changeOrderPosition(orderline, 1)
    }

    const decreaseOrderPosition = async (orderline) => {
        await changeOrderPosition(orderline, -1)
    }

    if (!access?.dispatcher?.read) return (<span>You don't have permission to access</span>)
    return (
        <div className='dispatcher-form'>

            {isShippingAreaLoading || isGatesPlacesLoading ?
                <div className='dispatcher-form__loader-div'><MyLoader/></div> : null}
            <ShippingAreaNavPanel
                shippingArea={shippingArea}
                setPlaceModal={setPlaceModal}
                setSelectedPlace={setSelectedPlace}
            />
            <div className='dispatcher-form__shipping-area'>
                <MyModal visible={placeModal} setVisible={setPlaceModal}>
                    <GatePlaceForm
                        selectedPlace={selectedPlace}
                        shippingArea={shippingArea}
                        setShippingArea={setShippingArea}
                        removeOrder={removeOrder}
                        removeOrders={removeOrders}
                        addOrder={addOrder}
                        updatePlaceStatus={updatePlaceStatus}
                        updateTruck={updateTruck}
                        updateLoadingTime_HHMM={updateLoadingTime_HHMM}
                        updateOrderLoadingStatus={updateOrderLoadingStatus}
                        increaseOrderPosition={increaseOrderPosition}
                        decreaseOrderPosition={decreaseOrderPosition}
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