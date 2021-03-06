import React from 'react';
import notStarted from "../../../../assets/warning.svg";
import checked from "../../../../assets/checked.svg";
import inProcess from "../../../../assets/timer.svg";

const OrderStatusIcon = ({orderline}) => {
    const defineStatus = (order) => {
        if(order.IS_INPLACE) return 'in-place'
        switch (order.STATUS) {
            case 0 || null:
                return 'not-started';
            case 2:
                return 'completed';
            default:
                return 'in-process';
        }
    }

    const setStatusImg = (order) => {
        if(order.IS_INPLACE) return checked;
        switch (order.STATUS) {
            case 0 || null:
                return notStarted;
            case 2:
                return checked;
            default:
                return inProcess;
        }

    }
    return (
        <div className='dynamic-order-line__order-status'>
            <img
                src={setStatusImg(orderline)}
                alt='status'
                className={'order-status__icon order-status__icon_' + defineStatus(orderline)}
            />
            <span className={'order-status__text'}>{defineStatus(orderline)}</span>
        </div>
    );
};

export default OrderStatusIcon;