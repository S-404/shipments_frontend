import React from 'react';
import Gate from "./Gate";

const Gates = ({
                   gates,
                   gatesPlaces,
                   setSelectedPlace,
                   setPlaceModal,
                   shippingArea,
                   selectedGate,
                   setSelectedGate,
                   setHistoryModal
               }) => {
    return (
        <div className="shipping-area__gates">
            {gates.map((gate) => (
                <Gate
                    key={`gate_${gate.GATE_ID}`}
                    gate={gate}
                    gatesPlaces={gatesPlaces}
                    setSelectedPlace={setSelectedPlace}
                    setPlaceModal={setPlaceModal}
                    shippingArea={shippingArea}
                    setSelectedGate={setSelectedGate}
                    setHistoryModal={setHistoryModal}
                    selectedGate={selectedGate}
                />
            ))}
        </div>
    );
};

export default Gates;