import React, {useEffect, useState} from 'react';
import TruckAssign from "./TruckAssign";
import MySmallButton from "../../UI/button/mySmallButton";
import {isOrdersInPlace} from "../../../helpers/statuses";


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

    const updLoadingStatus = (placeID,newStatus) =>{
            updatePlaceStatus(placeID, newStatus);
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
                        onClick={() => updLoadingStatus(selectedPlace.PLACE_ID, 0)}
                        text='stop loading'
                    />
                </div>
                :
                selectedPlace.TRUCK &&
                isOrdersInPlace(filteredShippingArea)?
                    <div className='truck__buttons-div'>
                        <MySmallButton
                            className='buttons-div__button'
                            onClick={() => updLoadingStatus(selectedPlace.PLACE_ID, 1)}
                            text='start loading'
                        />
                    </div>
                    : null
            }
        </div>
    );
};

export default TruckLoadingInputs;