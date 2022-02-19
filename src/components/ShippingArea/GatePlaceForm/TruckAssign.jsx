import React from 'react';
import MyInput from "../../UI/input/myInput/myInput";
import {isValidInput} from "../../../helpers/validation";
import MySmallButton from "../../UI/button/mySmallButton";

const TruckAssign = ({truck,setTruck,assignTruck}) => {
    function putTruckNum(value){
        if (isValidInput(value)) setTruck(value)
    }
    return (
        <div className='truck__assign-truck-div'>
            <div className='assign-truck-div__input'>
                <MyInput
                    maxLength={20}
                    placeholder='put truck num'
                    value={truck}
                    onChange={(e) => putTruckNum(e.target.value)}
                    labeltext='truck'
                />
            </div>
            <div className='assign-truck-div__button'>
                <MySmallButton
                    onClick={assignTruck}
                    text='assign'
                />
            </div>
        </div>
    );
};

export default TruckAssign;