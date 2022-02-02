import React from 'react';

const Trucks = ({gate, gatesPlaces, shippingArea}) => {

    const isOrdersCompleted = (place, shippingArea) => {
        let orderLines = shippingArea.filter(place_ => place_.PLACE_ID === place.ID && place_.ORDER_NUM !== null).length
        let completedOrders = shippingArea.filter(place_ => place_.PLACE_ID === place.ID && place_.STATUS === 2).length
        return orderLines && (orderLines === completedOrders)
    }


    const statusString = (place) => {
        switch (place.IS_LOADING) {
            case 0:
                return isOrdersCompleted(place, shippingArea) ? 'ready' : 'waiting'
            case 1:
                return 'loading';
            case 2:
                return 'completed'
            default:
                return 'waiting';
        }
    }

    return (
        <div className='shipping-area__trucks'>
            <div className='trucks__truck-list'>
                <h1 className='truck-list__header'>TRUCKS:</h1>
                <br/>
                {gatesPlaces
                    .filter((place) =>
                        // place.GATE_ID === gate.GATE_ID &&
                        place.TRUCK &&
                        place.IS_LOADING !== 2
                    )
                    .sort((a, b) => {
                            let aTime = parseInt(`${a.LOADING_TIME_HH}${a.LOADING_TIME_MM}`)
                            let bTime = parseInt(`${b.LOADING_TIME_HH}${b.LOADING_TIME_MM}`)
                            let aCompleted = isOrdersCompleted(a, shippingArea);
                            let bCompleted = isOrdersCompleted(b, shippingArea)


                            if (a.IS_LOADING < b.IS_LOADING) return -1;
                            if (a.IS_LOADING > b.IS_LOADING) return 1;
                            if (aCompleted < bCompleted) return 1;
                            if (aCompleted > bCompleted) return -1;

                            if (aTime < bTime) return -1;
                            if (aTime > bTime) return 1;
                            return 0;
                        }
                    )
                    .map((place) => (
                            <div
                                key={`truck_${place.ID}`}
                                className={`truck_list__truck truck_list__truck_${statusString(place)}`}
                            >
                                <div className='truck__time-status'>
                                    <div className='truck__dt time-status__time'>
                                         <span className='time__hh-mm'>
                                            {place.LOADING_TIME_HH ?
                                                `${place.LOADING_TIME_HH}:${place.LOADING_TIME_MM}`
                                                : null
                                            }
                                         </span>
                                    </div>
                                    <span className='truck__dt time-status__status'>
                                    {statusString(place)}
                                    </span>
                                </div>
                                <span className='truck__dt truck__name'>{place.TRUCK}</span>
                                <div className='truck__dt truck__location'>
                                    <span className='location__gate-place'>
                                        {`GATE ${place.GATE}-${place.PLACE}`}
                                    </span>
                                </div>



                            </div>
                        )
                    )}
            </div>
        </div>
    );
};

export default Trucks;