import React from 'react';
import Gate from "./Gate";

const Gates = ({gates,gatesPlaces,setSelectedPlace,setPlaceModal,shippingArea}) => {
    return (
        <div className="gates">
            {gates.map((gate) => (
               <Gate
                   key={`gate_${gate}`}
                   gate={gate}
                   gatesPlaces={gatesPlaces}
                   setSelectedPlace={setSelectedPlace}
                   setPlaceModal={setPlaceModal}
                   shippingArea={shippingArea}/>
            ))}
        </div>
    );
};

export default Gates;