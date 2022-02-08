import React, {useState} from 'react';
import MyInput from "../../../../components/UI/input/myInput/myInput";
import {isValidInput} from "../../../../helpers/validation";
import MyButton from "../../../../components/UI/button/myButton";

const AddGate = ({createGate, setVisible}) => {
    const [newGateName, setNewGateName] = useState('');

    function addGate() {
        createGate(newGateName);
        setNewGateName('');
        setVisible();
    }

    function putGateName(value) {
        if (isValidInput(value)) setNewGateName(value)
    }

    return (
        <div>
            <h1>Add New Gate</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='new gate'
                value={newGateName}
                onChange={(e) => putGateName(e.target.value)}
                labeltext='new gate'
            />
            <MyButton onClick={addGate}>Add Gate</MyButton>
        </div>
    );
};

export default AddGate;