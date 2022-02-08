import {useMemo} from "react";


export const useSortedHistory = (history) => {
    return useMemo(() => {
        if (history.length) {
            return [...history].sort((a, b) => new Date(b['DATE_']) - new Date(a['DATE_']));
        }
        return history;
    }, [history]);
};


export  const useFilteredHistory = (history, query, value )=>{
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

export  const useHistoryList = (history, filter)=>{
    const filteredByPlace = useFilteredHistory(history, 'PLACE', filter.PLACE);
    const filteredByUser = useFilteredHistory(filteredByPlace,'USER_ID', filter.USERID);
    const filteredByOrdernum = useFilteredHistory(filteredByUser,'ORDER_NUM',filter.ORDERNUM)
    return useSortedHistory(filteredByOrdernum);
}


