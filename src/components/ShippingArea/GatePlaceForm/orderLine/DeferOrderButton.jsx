import React from 'react';
import defer_icon from "../../../../assets/history_icon.svg";

const DeferOrderButton = ({orderline, deferOrder, deferOrderLoading}) => {
    return (
        <div
            className='dynamic-order-line__defer-button'
            onClick={() => deferOrder(orderline)}
        >
            {deferOrderLoading ? <span>...</span> :
                <div>
                    <img
                        className='defer-button__icon'
                        alt='x'
                        src={defer_icon}
                    />
                    <span className='defer-button__text'>defer</span>
                </div>
            }

        </div>
    );
};

export default DeferOrderButton;