import React from 'react';
import Gate from "./Gate";
import MySmallButton from "../../../../components/UI/button/mySmallButton";

const Gates = ({gates,setSelectedGate,gatesPlaces,setSelectedPlace,setVisible}) => {
    return (
        <div className='shipping-area__gates'>
            {gates.map(gate => (
                <Gate
                    key={`gate${gate.GATE_ID}`}
                    gate={gate}
                    setSelectedGate={setSelectedGate}
                    gatesPlaces={gatesPlaces}
                    setSelectedPlace={setSelectedPlace}
                    setVisible={setVisible}
                />
            ))}
            <div className='button-div'>
                <MySmallButton onClick={() => setVisible('newGate', true)} text='+ add gate'/>
            </div>
        </div>
    );
};

export default Gates;