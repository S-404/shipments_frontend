import React from 'react';
import MySmallButton from "../../../../components/UI/button/mySmallButton";
import GatePlace from "./GatePlace";

const Gate = ({gate, setSelectedGate, gatesPlaces, setSelectedPlace, setVisible}) => {
    function editGate(){
        setSelectedGate({...gate});
        setVisible('gateForm', true);
    }
    function addPlace(){
        setVisible('newPlace', true);
        setSelectedGate({...gate});
    }
    return (
        <div className='gates__gate'>
            <div className='gate__header'>
                <span className='header__name'> {`GATE ${gate.GATE}`}</span>
                <MySmallButton
                    text='✎'
                    onClick={editGate}
                />
            </div>
            <div className='gate__places'>
                {gatesPlaces
                    .filter(gatePlace =>
                        gatePlace.GATE_ID === gate.GATE_ID &&
                        gatePlace.ID !== null
                    )
                    .map(place => (
                        <GatePlace
                            key={`place${place.ID}`}
                            place={place}
                            gate={gate}
                            setSelectedPlace={setSelectedPlace}
                            setSelectedGate={setSelectedGate}
                            setVisible={setVisible}
                        />
                    ))}
                <div className='button-div'>
                    <MySmallButton
                        onClick={addPlace}
                        text='+ add place'
                    />
                </div>
            </div>
        </div>
    );
};

export default Gate;