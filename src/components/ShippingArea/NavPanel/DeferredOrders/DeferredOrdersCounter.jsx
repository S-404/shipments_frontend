import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MyModal from "../../../UI/modal/myModal";
import DeferredOrders from "./DeferredOrders";
import {useInterval} from "../../../../hooks/useInterval";
import {useFetching} from "../../../../hooks/useFetching";
import OrdersService from "../../../../api/OrdersService";

const DeferredOrdersCounter = () => {
    const dispatch = useDispatch();
    const deferred = useSelector(state => state.deferred)
    const [fetchDeferred, deferredLoading] = useFetching(async ()=>{

        const responseData = await OrdersService.getDeferredOrderList();

        dispatch({type: 'SET_DEFERRED', value: responseData});
    })

    useInterval(async () => {
        if (!deferredLoading) {
            await fetchDeferred();
        }
    }, 8000)

    useEffect(async ()=>await fetchDeferred(),[])

    const [deferModalVisible, setDeferModalVisible] = useState(false)
    return (
        <div className='dispatcher-nav-panel__deferred-orders'>
            <MyModal visible={deferModalVisible} setVisible={() => setDeferModalVisible(false)}>
                <DeferredOrders deferred={deferred}/>
            </MyModal>
            <div
                className='deferred-orders__deferred-counter'
                onClick={() => setDeferModalVisible(true)}
            >
                Deferred Orders: {deferred.length}
            </div>
        </div>
    );
};

export default DeferredOrdersCounter;