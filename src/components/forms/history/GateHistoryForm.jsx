import React, {useEffect, useMemo, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import MyLoader from "../../UI/loader/myLoader";
import ShipmentService from "../../../api/ShipmentService";
import GateLogList from "./GateLogList";
import GateLogListFilter from "./GateLogListFilter";
import '../../../styles/gateHistoryForm.scss'


const useSortedHistory = (history) => {
    return useMemo(() => {
        if (history.length) {
            return [...history].sort((a, b) => new Date(b['DATE_']) - new Date(a['DATE_']));
        }
        return history;
    }, [history]);
};


const useFilteredHistory = (history, query, value )=>{
    return useMemo(()=>{
        if(history.length && value){
            return [...history].filter((x)=>{
                let str =  x[query] === null ? '' :  x[query].toLocaleLowerCase();
                return str.includes(value.toLocaleLowerCase());
            })
        }
        return history;
    },[history,query,value])
}

const useHistoryList = (history, filter)=>{
    const filteredByPlace = useFilteredHistory(history, 'PLACE', filter.PLACE);
    const filteredByUser = useFilteredHistory(filteredByPlace,'USER_ID', filter.USERID);
    const filteredByOrdernum = useFilteredHistory(filteredByUser,'ORDER_NUM',filter.ORDERNUM)
    return useSortedHistory(filteredByOrdernum);
}



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