import React, {useState} from 'react';
import MyInput from "../../UI/input/myInput";
import {isValidInput} from "../../../utils";
import MyButton from "../../UI/button/myButton";

const AddPlace = ({createPlace, setVisible}) => {
    const [newPlaceName, setNewPlaceName] = useState('')
    return (
        <div>
            <h1>Add New Place</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='new place'
                value={newPlaceName}
                onChange={(e) => {
                    if (isValidInput(e.target.value)) setNewPlaceName(e.target.value)
                }}
                labeltext='new place'
            />
            <MyButton onClick={() => {
                createPlace(newPlaceName);
                setNewPlaceName('')
                setVisible();
            }}>Add Place</MyButton>
        </div>
    );
};

export default AddPlace;