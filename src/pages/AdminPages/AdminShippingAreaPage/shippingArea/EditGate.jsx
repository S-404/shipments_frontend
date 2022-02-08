import React from 'react';
import MyInput from "../../../../components/UI/input/myInput/myInput";
import {isValidInput} from "../../../../helpers/validation";
import MyButton from "../../../../components/UI/button/myButton";

const EditGate = ({selectedGate,setSelectedGate,updateGate,deleteGate}) => {
    function putGateName(value){
        if (isValidInput(value)) setSelectedGate({
            ...selectedGate, GATE: value
        })
    }
    return (
        <div>
            <h1>Edit Gate</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='gate'
                value={selectedGate.GATE}
                onChange={(e) => putGateName(e.target.value)}
                labeltext='gate'
            />
            <MyButton onClick={() => updateGate(selectedGate)}>Update Gate</MyButton>
            <MyButton onClick={() => deleteGate(selectedGate.GATE_ID)}>Remove Gate</MyButton>
        </div>
    );
};

export default EditGate;