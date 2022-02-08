import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import MyLoader from "../UI/loader/myLoader/myLoader";
import OrdersService from "../../api/OrdersService";
import GateLogListTable from "./GateLogListTable";
import GateLogListFilter from "./GateLogListFilter";
import './gateHistoryForm.scss'
import {useHistoryList} from "./useHistory";


const GateHistoryForm = ({historyModal, selectedGate,}) => {

    const [filter, setFilter] = useState({
        PLACE: '',
        USERID: '',
        ORDERNUM: '',
    })
    const [gateHistory, setGateHistory] = useState([{ID: 0,}])

    const sortedFilteredHistory = useHistoryList(gateHistory, filter);

    const [fetchHistory, isHistoryLoading] = useFetching(async () => {
        const responseData = await OrdersService.getOrdersHistory({
            GATE_ID: selectedGate.GATE_ID,
        });
        setGateHistory(responseData);
    })

    useEffect(() => {
        if (historyModal) fetchHistory()
    }, [historyModal, selectedGate])

    return (
        <div className='gate-history-form'>
            <h1 className='gate-history-form__gate-history-header'>History</h1>
            {isHistoryLoading ?
                <MyLoader/>
                :
                <div className='gate-history-form__gate-history-body'>
                    <GateLogListFilter filter={filter} setFilter={setFilter}/>
                    <GateLogListTable gateHistory={sortedFilteredHistory}/>
                </div>

            }
        </div>
    );
};

export default GateHistoryForm;