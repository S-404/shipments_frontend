import React, {useEffect, useState} from 'react';
import Trucks from "../../components/Trucks/Trucks";
import {useFetching} from "../../hooks/useFetching";
import OrdersService from "../../api/OrdersService";
import MyLoader from "../../components/UI/loader/myLoader/myLoader";
import {useInterval} from "../../hooks/useInterval";
import './driverPage.css'
import ShipmentAreaService from "../../api/ShipmentAreaService";

const Driver = () => {
    const [gatesPlaces, setGatesPlaces] = useState([]);
    const [shippingArea, setShippingArea] = useState([]);

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
    }, 12000)


    useEffect(async () =>
            await fetchShippingArea()
        , []);

    useEffect(async () => {
        if (shippingArea.length) {
            await fetchGatesPlacesList();
        }
    }, [shippingArea])

    return (
        <div className='driver-page'>
            {(isShippingAreaLoading || isGatesPlacesLoading) &&
                <div className='driver-page__loader'><MyLoader/></div>
            }
            <Trucks
                gatesPlaces={gatesPlaces}
                shippingArea={shippingArea}
            />
        </div>
    );
};

export default Driver;