import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../../hooks/useFetching";
import MyLoader from "../../../UI/loader/myLoader";
import ShipmentService from "../../../../api/ShipmentService";
import GateLogList from "./GateLogList";
import GateLogListFilter from "./GateLogListFilter";
import '../../../../styles/gateHistoryForm.scss'
import {useHistoryList} from "../../../../hooks/useHistory";


const GateHistoryForm = ({historyModal, selectedGate,}) => {

    const [filter, setFilter] = useState({
        PLACE: '',
        USERID: '',
        ORDERNUM: '',
    })
    const [gateHistory, setGateHistory] = useState([{ID: 0,}])

    const sortedFilteredHistory = useHistoryList(gateHistory, filter);

    const [fetchHistory, isHistoryLoading, isHistoryError] = useFetching(async () => {
        const responseData = await ShipmentService.getData({
            query: 'orders/log',
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
                    <GateLogList gateHistory={sortedFilteredHistory}/>
                </div>

            }
        </div>
    );
};

export default GateHistoryForm;