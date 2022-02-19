import React from 'react';
import MyCheckBox from "../../../UI/checkbox/myCheckBox";

const OrderLoadedStatus = ({orderline,changeStatus}) => {
    return (
        <div className='dynamic-order-line__loaded-status dynamic-order-line__col-3'>
            <MyCheckBox
                checked={!!orderline.IS_LOADED}
                onChange={(e) => changeStatus(e)}
            />
        </div>
    );
};

export default OrderLoadedStatus;