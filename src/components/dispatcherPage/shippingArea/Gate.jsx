import React from 'react';
import GatePlace from "./GatePlace";
import history_svg from "../../../assets/history_icon.svg"

const Gate = ({
                  gate,
                  gatesPlaces,
                  setSelectedPlace,
                  setPlaceModal,
                  shippingArea,
                  selectedGate,
                  setSelectedGate,
                  setHistoryModal
              }) => {
    return (
        <div className="gates__gate">
            <div className='gate__gate-header'>
                <h1 className='gate-header__gate-name'>
                    <span className={'gate-name__gate'}>GATE</span>
                    <span className={'gate-name__name'}>{gate.GATE}</span>
                </h1>
                <img
                    className='gate-header__history-image'
                    alt='history'
                    src={history_svg}
                    onClick={() => {
                        setSelectedGate({...selectedGate, GATE_ID: gate.GATE_ID});
                        setHistoryModal(true);
                    }}
                />
            </div>
            <div className='gate__gate-body'>
                <div className="gate-body__places">
                    {gatesPlaces
                        .filter((place) => place.GATE_ID === gate.GATE_ID)
                        .map((place) => (
                            <GatePlace
                                key={`GatePlace_${place.ID}`}
                                place={place}
                                shippingArea={shippingArea}
                                onClick={() => {
                                    setSelectedPlace(
                                        {
                                            PLACE_ID: place.ID,
                                            GATE: gate.GATE,
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
        </div>


    );
};

export default Gate;