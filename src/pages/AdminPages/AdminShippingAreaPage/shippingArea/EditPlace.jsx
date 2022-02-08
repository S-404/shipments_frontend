import React from 'react';
import MyInput from "../../../../components/UI/input/myInput/myInput";
import {isValidInput} from "../../../../helpers/validation";
import MyButton from "../../../../components/UI/button/myButton";

const EditPlace = ({selectedPlace,setSelectedPlace,updatePlace,deletePlace}) => {
    function putPlaceName(value){
        if (isValidInput(value)) setSelectedPlace({
            ...selectedPlace, PLACE: value
        })
    }
    return (
        <div>
            <h1>Edit Place</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='place'
                value={selectedPlace.PLACE}
                onChange={(e) => putPlaceName(e.target.value)}
                labeltext='place'
            />
            <MyButton onClick={() => updatePlace(selectedPlace)}>Update Place</MyButton>
            <MyButton onClick={() => deletePlace(selectedPlace.PLACE_ID)}>Remove Place</MyButton>
        </div>
    );
};

export default EditPlace;