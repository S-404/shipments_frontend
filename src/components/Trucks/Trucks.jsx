import React from 'react';
import './truckList.scss'
import Truck from "./Truck";
import {isOrdersInPlace} from "../../helpers/statuses";
import {orderListOfPlace} from "../../helpers/orders";

const Trucks = ({gatesPlaces, shippingArea}) => {
    return (
        <div className='shipping-area__trucks'>
            <div className='trucks__truck-list'>
                <h1 className='truck-list__header'>TRUCKS:</h1>
                <br/>
                {gatesPlaces
                    .filter((place) =>
                        place.TRUCK && // truck is assigned
                        place.IS_LOADING !== 2 && // truck is loading
                        place.MAX_DATE // there are orders in place ('max_date' shows when the last order was added)
                    )
                    .sort((a, b) => {
                            if (a.IS_LOADING < b.IS_LOADING) return -1;
                            if (a.IS_LOADING > b.IS_LOADING) return 1;

                            let aCompleted = isOrdersInPlace(orderListOfPlace(a, shippingArea));
                            let bCompleted = isOrdersInPlace(orderListOfPlace(b, shippingArea));
                            if (aCompleted < bCompleted) return 1;
                            if (aCompleted > bCompleted) return -1;

                            let aTime = parseInt(`${a.LOADING_TIME_HH}${a.LOADING_TIME_MM}`)
                            let bTime = parseInt(`${b.LOADING_TIME_HH}${b.LOADING_TIME_MM}`)
                            if (aTime < bTime) return -1;
                            if (aTime > bTime) return 1;

                            return 0;
                        })
                    .map((place) => (
                            <Truck
                                key={`truck_${place.ID}`}
                                shippingArea={shippingArea}
                                place={place}
                            />
                        )
                    )}
            </div>
        </div>
    );
};

export default Trucks;