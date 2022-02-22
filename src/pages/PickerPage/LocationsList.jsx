import React from 'react';

const LocationsList = ({locations, criteria, searchedNum}) => {
    return (
        <div className='find-place__locations'>
            <div className='locations__order-num'>
                {locations.length ?
                    <div className='order-num__order-line'>
                        <span className='order-line__criteria'>{criteria.toUpperCase()}:</span>
                        <span className='order-line__num'>{locations[0].ORDER_NUM}</span>
                    </div>
                    :
                    <div>
                        <p>{criteria}</p>
                        <p>{searchedNum}</p>
                        <p>is not found</p>
                    </div>

                }
            </div>
            <div className='locations__list'>
                {locations.map((location, index) => (
                    <div className='list__location'
                         key={index + location}>
                        <span>GATE:</span>
                        <span>
                        {`${location.GATE} - ${location.PLACE} - ${
                            location.POSITION ? location.POSITION : 1
                        }`}</span>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationsList;