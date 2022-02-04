import React, {useEffect, useState} from 'react';
import Trucks from "../dispatcherPage/shippingArea/Trucks";
import {useFetching} from "../../hooks/useFetching";
import ShipmentService from "../../api/ShipmentService";
import MyLoader from "../UI/loader/myLoader";
import {useInterval} from "../../hooks/useInterval";
import '../../styles/driverPage.css'

const Driver = () => {
    const [gatesPlaces, setGatesPlaces] = useState([]);
    const [shippingArea, setShippingArea] = useState([]);

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