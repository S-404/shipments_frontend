import React from 'react';

const GatePlace = ({place, gate, setSelectedPlace, setSelectedGate, setVisible}) => {

    function selectPlace() {
        setSelectedPlace({
            PLACE_ID: place.ID,
            GATE: gate.GATE,
            PLACE: place.PLACE,
            IS_LOADING: place.IS_LOADING,
            TRUCK: place.TRUCK
        });
        setSelectedGate({...gate});
        setVisible('placeForm', true);
    }

    return (
        <div
            className='places__place'
            onClick={selectPlace}
        >
            {place.PLACE}
        </div>
    );
};

export default GatePlace;