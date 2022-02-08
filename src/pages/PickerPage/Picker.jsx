import React, {useEffect, useState} from 'react';
import MyInput from "../../components/UI/input/myInput/myInput";
import {useFetching} from "../../hooks/useFetching";
import OrdersService from "../../api/OrdersService";
import MyLoader from "../../components/UI/loader/myLoader/myLoader";
import './pickerPage.scss'
import scanBarcode from '../../assets/scan_barcode.svg'
import {useSelector} from "react-redux";

const Picker = () => {
    const [orderNum, setOrderNum] = useState('')
    const [searchingOrder, setSearchingOrder] = useState('')
    const [locations, setLocations] = useState([{ORDER_NUM: '', GATE: '', PLACE: ''}])


    const [fetchLocation, isLocationLoading] = useFetching(async () => {
        const responseData = await OrdersService.getOrder({
            ORDER_NUM: orderNum
        });
        setLocations(responseData);
        setOrderNum('');
        console.log(responseData)
        if(responseData[0]?.ORDER_NUM){
              await OrdersService.updOrderStatus({
                ORDER_NUM: orderNum
            });
        }
    });


    useEffect(async () => {
            if (orderNum.length === 9) {
                setSearchingOrder(orderNum)
                await fetchLocation()
            }
        }
        , [orderNum])

    const access = useSelector(state => state.access)
    if (!access?.picker?.read) return ( <span>You don't have permission to access</span>)

    return (
        <div className='picker-form'>
            <img className='picker-form__barcode' alt='scanBarcode' src={scanBarcode}/>
            <MyInput
                labeltext={orderNum.length ? 'put order num' : null}
                placeholder='put order num'
                value={orderNum}
                maxLength={9}
                onChange={(e) => setOrderNum(e.target.value)}
            />
            {isLocationLoading ?
                <div className='picker-form__loader-div'><MyLoader/></div>
                :
                <div className='picker-form__locations'>
                    <div className='locations__order-num'>
                        {locations.length ?
                            `Order: ${locations[0].ORDER_NUM}` :
                            `Order ${searchingOrder} is not found`
                        }
                    </div>
                    <div className='locations__list'>
                        {locations.map((location, index) => (
                            <div className='list__location'
                                 key={index + location}>
                                {`GATE: ${location.GATE} - ${location.PLACE}`}
                            </div>
                        ))}
                    </div>
                </div>
            }


        </div>
    );
};

export default Picker;