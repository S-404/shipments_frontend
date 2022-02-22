import React from 'react';
import {useSelector} from "react-redux";
import FindPlace from "./FindPlace";

const FindByPickId = () => {
    const findPlaceMode = {criteria: 'pickID',maxLength: 5,minLength:3}

    const access = useSelector(state => state.access)
    if (!access?.picker?.read) return ( <span>You don't have permission to access</span>)

    return (
        <div className='picker-page'>
        <FindPlace
            criteria={findPlaceMode.criteria}
            maxLength={findPlaceMode.maxLength}
            minLength={findPlaceMode.minLength}
            placeholder={`put ${findPlaceMode.minLength}-${findPlaceMode.maxLength}-digit ${findPlaceMode.criteria}`}
        />
        </div>
    );
};

export default FindByPickId;