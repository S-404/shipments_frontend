import React from 'react';
import StatusButton from "../../UI/button/statusButton";

const DynamicOrderLine = ({orderline,removeOrder }) => {
    return (
        <div
            className="dynamic-orderline">

           <StatusButton text='remove' onClick={()=> removeOrder(orderline.ORDER_ID)}/>
           <span>{orderline.ORDER_NUM}</span>

        </div>
    );
};

export default DynamicOrderLine;