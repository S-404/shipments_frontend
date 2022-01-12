import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/myInput";
import {useFetching} from "../../hooks/useFetching";
import ShipmentService from "../../api/ShipmentService";
import MyLoader from "../UI/loader/myLoader";
import '../../styles/pickerForm.scss'

const Picker = () => {
    const [orderNum, setOrderNum] = useState('')
    const [locations, setLocations] = useState([{ORDER_NUM: '', GATE: '', PLACE: ''}])


    const [fetchLocation, isLocationLoading, isLocationError] = useFetching(async () => {
        const responseData = await ShipmentService.getData({
            query: 'orders/order', ORDER_NUM: orderNum
        });
        setLocations(responseData);
    });


    useEffect(async () => {
            if (orderNum.length === 9) {
                await fetchLocation()
            }
        }
        , [orderNum])

    return (
        <div className='picker-form'>
            <MyInput
                labeltext={orderNum.length?'put order num':null}
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
                        {locations.length ? `Order: ${locations[0].ORDER_NUM}` : 'not found'}
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