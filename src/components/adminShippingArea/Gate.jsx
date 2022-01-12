import React from 'react';
import MySmallButton from "../UI/button/mySmallButton";
import GatePlace from "./GatePlace";

const Gate = ({gate, setSelectedGate, gatesPlaces, setSelectedPlace, setVisible}) => {
    return (
        <div className='gates__gate'>
            <div className='gate__header'>
                <span className='header__name'> {`GATE ${gate.GATE}`}</span>
                <MySmallButton
                    text='✎'
                    onClick={() => {
                        setSelectedGate({...gate});
                        setVisible('gateForm', true);
                    }}
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
                        onClick={() => {
                            setVisible('newPlace', true);
                            setSelectedGate({...gate});
                        }}
                        text='+ add place'
                    />
                </div>
            </div>
        </div>
    );
};

export default Gate;