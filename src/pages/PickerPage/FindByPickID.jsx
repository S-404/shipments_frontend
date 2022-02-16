import React from 'react';
import {useSelector} from "react-redux";
import FindPlace from "./FindPlace";

const FindByPickId = () => {
    const findPlaceMode = {criteria: 'pickID',maxLength: 5}

    const access = useSelector(state => state.access)
    if (!access?.picker?.read) return ( <span>You don't have permission to access</span>)

    return (
        <div className='picker-form'>
        <FindPlace
            criteria={findPlaceMode.criteria}
            maxLength={findPlaceMode.maxLength}
        />
        </div>
    );
};

export default FindByPickId;