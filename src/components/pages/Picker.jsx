import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/myInput";
import {useFetching} from "../../hooks/useFetching";
import ShipmentService from "../../api/ShipmentService";
import MyLoader from "../UI/loader/myLoader";
import '../../styles/pickerPage.scss'
import scanBarcode from '../../assets/scan_barcode.svg'

const Picker = () => {
    const [orderNum, setOrderNum] = useState('')
    const [searchingOrder, setSearchingOrder] = useState('')
    const [locations, setLocations] = useState([{ORDER_NUM: '', GATE: '', PLACE: ''}])


    const [fetchLocation, isLocationLoading, isLocationError] = useFetching(async () => {
        const responseData = await ShipmentService.getData({
            query: 'orders/order', ORDER_NUM: orderNum
        });
        setLocations(responseData);
        setOrderNum('');
    });


    useEffect(async () => {
            if (orderNum.length === 9) {
                setSearchingOrder(orderNum)
                await fetchLocation()
            }
        }
        , [orderNum])

    return (
        <div className='picker-form'>
            <img className='picker-form__barcode' alt='scanBarcode' src={scanBarcode}/>
            <MyInput
                labeltext={orderNum.length ? 'put order num' : null}
                placeholder='put order num'
                value={orderNum}
                maxLength={9}
                onChange={(e) => {
                    setOrderNum(e.target.value)
                }}/>
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