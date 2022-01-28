import React, {useEffect, useState} from 'react';
import LoadingTimePicker from "./LoadingTimePicker";
import TruckAssign from "./TruckAssign";
import MySmallButton from "../../UI/button/mySmallButton";


const TruckLoadingInputs = ({
                                selectedPlace,
                                updateTruck,
                                updateLoadingTime_HHMM,
                                updatePlaceStatus,
                                removeOrders,
                                filteredShippingArea
                            }) => {
    const [truck, setTruck] = useState('')

    const assignTruck = () => {
        updateTruck(truck, selectedPlace.PLACE_ID)
    }

    useEffect(() => {
        setTruck(selectedPlace.TRUCK ? selectedPlace.TRUCK : '')

    }, [selectedPlace])
    return (
        <div className='gate-place-form__truck'>
            <h1 className='truck__name'>{`GATE ${selectedPlace.GATE} - ${selectedPlace.PLACE}`}</h1>
            <LoadingTimePicker
                selectedPlace={selectedPlace}
                updateLoadingTime_HHMM={updateLoadingTime_HHMM}
            />
            <TruckAssign assignTruck={assignTruck} truck={truck} setTruck={setTruck}/>
            {selectedPlace.IS_LOADING ?
                <div className='truck__buttons-div'>
                    <MySmallButton
                        className='buttons-div__button'
                        onClick={() => updatePlaceStatus(selectedPlace)}
                        text='stop loading'
                    />
                    <MySmallButton
                        className='buttons-div__button'
                        onClick={() => {
                            removeOrders(selectedPlace);
                        }}
                        text='finish loading'
                    />
                </div>
                :
                filteredShippingArea.length ?
                    <div className='truck__buttons-div'>
                        <MySmallButton
                            className='buttons-div__button'
                            onClick={() => updatePlaceStatus(selectedPlace)}
                            text='start loading'
                        />
                    </div>
                    : null
            }
        </div>
    );
};

export default TruckLoadingInputs;