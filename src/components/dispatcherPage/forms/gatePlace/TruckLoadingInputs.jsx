import React, {useEffect, useState} from 'react';
import LoadingTimePicker from "./LoadingTimePicker";
import TruckAssign from "./TruckAssign";
import MySmallButton from "../../../UI/button/mySmallButton";


const TruckLoadingInputs = ({
                                selectedPlace,
                                updateTruck,
                                updatePlaceStatus,
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
            <TruckAssign assignTruck={assignTruck} truck={truck} setTruck={setTruck}/>
            {selectedPlace.IS_LOADING ?
                <div className='truck__buttons-div'>
                    <MySmallButton
                        className='buttons-div__button'
                        onClick={() => updatePlaceStatus(selectedPlace.PLACE_ID, 0)}
                        text='stop loading'
                    />
                </div>
                :
                filteredShippingArea.length && selectedPlace.TRUCK ?
                    <div className='truck__buttons-div'>
                        <MySmallButton
                            className='buttons-div__button'
                            onClick={() => updatePlaceStatus(selectedPlace.PLACE_ID, 1)}
                            text='start loading'
                        />
                    </div>
                    : null
            }
        </div>
    );
};

export default TruckLoadingInputs;