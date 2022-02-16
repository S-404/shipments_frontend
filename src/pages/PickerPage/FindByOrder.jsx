import React from 'react';
import {useSelector} from "react-redux";
import FindPlace from "./FindPlace";

const FindByOrder = () => {
    const findPlaceMode = {criteria: 'order', maxLength: 9}

    const access = useSelector(state => state.access)
    if (!access?.picker?.read) return (<span>You don't have permission to access</span>)

    return (
        <div className='find-location'>
            <FindPlace
                criteria={findPlaceMode.criteria}
                maxLength={findPlaceMode.maxLength}
            />
        </div>
    );
};

export default FindByOrder;