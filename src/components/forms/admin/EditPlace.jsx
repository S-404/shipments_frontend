import React from 'react';
import MyInput from "../../UI/input/myInput";
import {isValidInput} from "../../../utils";
import MyButton from "../../UI/button/myButton";

const EditPlace = ({selectedPlace,setSelectedPlace,updatePlace,deletePlace}) => {
    return (
        <div>
            <h1>Edit Place</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='place'
                value={selectedPlace.PLACE}
                onChange={(e) => {
                    if (isValidInput(e.target.value)) setSelectedPlace({
                        ...selectedPlace, PLACE: e.target.value
                    })
                }}
                labeltext='place'
            />
            <MyButton onClick={() => updatePlace(selectedPlace)}>Update Place</MyButton>
            <MyButton onClick={() => deletePlace(selectedPlace.PLACE_ID)}>Remove Place</MyButton>
        </div>
    );
};

export default EditPlace;