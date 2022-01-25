import React from 'react';
import '../../../styles/table.scss'
import {dateFormatDDMMyyyyHHmm} from "../../../utils";

const GateLogList = ({gateHistory}) => {
    return (
        <div className='gate-log-table'>
            <div className="table__container">
                <ul className="container__responsive-table">
                    <li className="responsive-table__table-header responsive-table__row-object">
                        <div className="table-header__col responsive-table__col col-1">Gate</div>
                        <div className="table-header__col responsive-table__col col-2">Place</div>
                        <div className="table-header__col responsive-table__col col-3">UserID</div>
                        <div className="table-header__col responsive-table__col col-4">Action</div>
                        <div className="table-header__col responsive-table__col col-5">OrderNum</div>
                        <div className="table-header__col responsive-table__col col-6">DateTime</div>
                    </li>
                    <div className='responsive-table__table-data'>
                        {gateHistory.map(order => (
                            <li
                                key={order.ID}
                                className={
                                    `table-data__table-row 
                                    responsive-table__row-object 
                                    table-data__table-row_${order.CODE}`
                                }
                            >
                                <div className="table-row__col responsive-table__col col-1"
                                     data-label="Place">{order.GATE}</div>
                                <div className="table-row__col responsive-table__col col-2"
                                     data-label="Place">{order.PLACE}</div>
                                <div className="table-row__col responsive-table__col col-3"
                                     data-label="UserID">{order.USER_ID}</div>
                                <div className="table-row__col responsive-table__col col-4"
                                     data-label="Action">{order.CODE}</div>
                                <div className="table-row__col responsive-table__col col-5"
                                     data-label="OrderNum">{order.ORDER_NUM}</div>
                                <div className="table-row__col responsive-table__col col-6"
                                     data-label="DateTime">{dateFormatDDMMyyyyHHmm(order.DATE_)}</div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>

    );
};

export default GateLogList;