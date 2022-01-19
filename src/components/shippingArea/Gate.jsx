import React from 'react';
import GatePlace from "./GatePlace";

const Gate = ({gate, gatesPlaces, setSelectedPlace, setPlaceModal, shippingArea}) => {
    return (
        <div className="gates__gate">
            <h1>{`GATE ${gate}`}</h1>
            <div className="gate__places">
            {gatesPlaces
                .filter((place) => place.GATE === gate)
                .map((place) => (
                    <GatePlace
                        key={`GatePlace_${place.ID}`}
                        place={place}
                        shippingArea={shippingArea}
                        onClick={() => {
                            setSelectedPlace(
                                {
                                    PLACE_ID: place.ID,
                                    GATE: gate,
                                    PLACE: place.PLACE,
                                    IS_LOADING: place.IS_LOADING,
                                    TRUCK: place.TRUCK,
                                    LOADING_TIME_HH: place.LOADING_TIME_HH,
                                    LOADING_TIME_MM: place.LOADING_TIME_MM,
                                }
                            );
                            setPlaceModal(true);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gate;