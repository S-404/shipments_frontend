import React from 'react';
import notStarted from "../../../assets/warning.svg";
import completed from "../../../assets/checked.svg";
import inProcess from "../../../assets/timer.svg";

const OrderStatusIcon = ({orderline}) => {
    const defineStatus = (status) => {
        switch (status) {
            case 0:
                return 'not-started';
            case 2:
                return 'completed';
            default:
                return 'in-process';
        }
    }

    const setStatusImg = (status) => {
        switch (status) {
            case 0:
                return notStarted;
            case 2:
                return completed;
            default:
                return inProcess;
        }

    }
    return (
        <div className='order-line__order-status'>
            <img
                src={setStatusImg(orderline.STATUS)}
                alt='status'
                className={'order-status__icon order-status__icon_' + defineStatus(orderline.STATUS)}
            />
            <span className={'order-status__text'}>{defineStatus(orderline.STATUS)}</span>
        </div>
    );
};

export default OrderStatusIcon;