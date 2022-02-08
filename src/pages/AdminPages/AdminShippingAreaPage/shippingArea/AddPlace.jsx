import React, {useState} from 'react';
import MyInput from "../../../../components/UI/input/myInput/myInput";
import {isValidInput} from "../../../../helpers/validation";
import MyButton from "../../../../components/UI/button/myButton";

const AddPlace = ({createPlace, setVisible}) => {
    const [newPlaceName, setNewPlaceName] = useState('')

    function addPlace() {
        createPlace(newPlaceName);
        setNewPlaceName('')
        setVisible();
    }

    function putPlaceName(value){
        if (isValidInput(value)) setNewPlaceName(value)
    }

    return (
        <div>
            <h1>Add New Place</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='new place'
                value={newPlaceName}
                onChange={(e) => putPlaceName(e.target.value)}
                labeltext='new place'
            />
            <MyButton onClick={addPlace}>
                Add Place
            </MyButton>
        </div>
    );
};

export default AddPlace;