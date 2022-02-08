import React from 'react';
import {statusString} from "../../helpers/statuses";

const Truck = ({place, shippingArea}) => {
    return (
        <div className={`truck_list__truck truck_list__truck_${statusString(place, shippingArea)}`}>
            <div className='truck__time-status'>
                <div className='truck__dt time-status__time'>
                    <span className='time__hh-mm'>
                        {place.LOADING_TIME_HH ?
                            `${place.LOADING_TIME_HH}:${place.LOADING_TIME_MM}`
                            : null}
                    </span>
                </div>
                <span className='truck__dt time-status__status'>
                    {statusString(place, shippingArea)}
                </span>
            </div>
            <span className='truck__dt truck__name'>{place.TRUCK}</span>
            <div className='truck__dt truck__location'>
                <span className='location__gate-place'>
                    {`GATE ${place.GATE}-${place.PLACE}`}
                </span>
            </div>
        </div>
    );
};

export default Truck;