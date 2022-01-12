import React from 'react';

const GatePlace = ({place,gate,setSelectedPlace,setSelectedGate,setVisible}) => {
    return (
            <div
                 className='places__place'
                 onClick={() => {
                     setSelectedPlace({
                         PLACE_ID: place.ID,
                         GATE: gate.GATE,
                         PLACE: place.PLACE,
                         IS_LOADING: place.IS_LOADING,
                         TRUCK: place.TRUCK
                     });
                     setSelectedGate({...gate});
                     setVisible('placeForm', true);
                 }}>
                {place.PLACE}
        </div>
    );
};

export default GatePlace;