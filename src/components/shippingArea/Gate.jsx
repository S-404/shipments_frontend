import React from 'react';
import GatePlace from "./GatePlace";

const Gate = ({gate, gatesPlaces, setSelectedPlace, setPlaceModal, shippingArea}) => {
    return (
        <div className="gate">
            <h1>{`GATE ${gate}`}</h1>
            {gatesPlaces
                .filter((place) => place.GATE === gate)
                .map((place) => (
                    <GatePlace
                        key={`GatePlace_${place.ID}`}
                        place={place}
                        shippingArea={shippingArea}
                        onClick={() => {
                            setSelectedPlace({GATE_ID: place.ID, GATE: gate, PLACE: place.PLACE});
                            setPlaceModal(true);
                        }}
                    />
                ))}
        </div>
    );
};

export default Gate;