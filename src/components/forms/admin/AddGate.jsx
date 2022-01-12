import React, {useState} from 'react';
import MyInput from "../../UI/input/myInput";
import {isValidInput} from "../../../utils";
import MyButton from "../../UI/button/myButton";

const AddGate = ({createGate,setVisible}) => {
    const [newGateName, setNewGateName] = useState('');
    return (
        <div>
            <h1>Add New Gate</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='new gate'
                value={newGateName}
                onChange={(e) => {
                    if (isValidInput(e.target.value)) setNewGateName(e.target.value)
                }}
                labeltext='new gate'
            />
            <MyButton onClick={() => {
                createGate(newGateName);
                setNewGateName('');
                setVisible();
            }}>Add Gate</MyButton>
        </div>
    );
};

export default AddGate;