import React from 'react';
import {truckStatusString} from "../../helpers/statuses";

const Truck = ({place, shippingArea}) => {
    return (
        <div className={`truck_list__truck truck_list__truck_${truckStatusString(place, shippingArea).className}`}>
            <div className='truck__time-status'>
                <div className='truck__dt time-status__time'>
                    <span className='time__hh-mm'>
                        {place.LOADING_TIME_HH ?
                            `${place.LOADING_TIME_HH}:${place.LOADING_TIME_MM}`
                            : null}
                    </span>
                </div>
                <span className='truck__dt time-status__status'>
                    {truckStatusString(place, shippingArea).statusString}
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