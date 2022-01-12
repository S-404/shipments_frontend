import React from 'react';
import MyInput from "../../UI/input/myInput";
import {isValidInput} from "../../../utils";
import MyButton from "../../UI/button/myButton";

const EditGate = ({selectedGate,setSelectedGate,updateGate,deleteGate}) => {
    return (
        <div>
            <h1>Edit Gate</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='gate'
                value={selectedGate.GATE}
                onChange={(e) => {
                    if (isValidInput(e.target.value)) setSelectedGate({
                        ...selectedGate, GATE: e.target.value
                    })
                }}
                labeltext='gate'
            />
            <MyButton onClick={() => updateGate(selectedGate)}>Update Gate</MyButton>
            <MyButton onClick={() => deleteGate(selectedGate.GATE_ID)}>Remove Gate</MyButton>
        </div>
    );
};

export default EditGate;