import React, {useEffect, useState} from 'react';
import MyInput from "../../components/UI/input/myInput/myInput";
import MyLoader from "../../components/UI/loader/myLoader/myLoader";
import {useFetching} from "../../hooks/useFetching";
import OrdersService from "../../api/OrdersService";
import scanBarcode from "../../assets/scan_barcode.svg";
import MyButton from "../../components/UI/button/myButton";

const FindPlace = ({maxLength, criteria}) => {

    const defaultLocations = [{ORDER_NUM: '', GATE: '', PLACE: ''}]

    const [inputNum, setInputNum] = useState('')
    const [searchedNum, setSearchedNum] = useState('')
    const [locations, setLocations] = useState(defaultLocations)


    const [fetchLocation, isLocationLoading] = useFetching(async () => {
        const responseData = await OrdersService.getOrderLocation({inputNum}, criteria);
        setLocations(responseData);
        setInputNum('');
        if (responseData[0]?.ORDER_NUM && criteria === 'order') {
            await OrdersService.updOrderStatus({
                ORDER_NUM: inputNum,
                IS_INPLACE: 1
            });
        }
    });

    const [uncheckIsInPlace] = useFetching(async ()=>{
        const responseData = await OrdersService.updOrderStatus({
            ORDER_NUM: searchedNum,
            IS_INPLACE: 0
        })
        if(responseData[0]?.ORDER_NUM){
            setLocations(defaultLocations);
            setSearchedNum('')
        }

    })


    useEffect(async () => {
            if (inputNum.length === maxLength) {
                setSearchedNum(inputNum)
                await fetchLocation()
            }
        }
        , [inputNum])


    return (
        <div className='picker-form'>
            <img className='picker-form__barcode' alt='scanBarcode' src={scanBarcode}/>
            <MyInput
                labeltext={inputNum.length ? `put ${maxLength}-digit ${criteria}` : null}
                placeholder={`put ${maxLength}-digit ${criteria}`}
                value={inputNum}
                maxLength={maxLength}
                onChange={(e) => setInputNum(e.target.value)}
            />
            {isLocationLoading ?
                <div className='picker-form__loader-div'><MyLoader/></div>
                :
                <div className='picker-form__locations'>
                    <div className='locations__order-num'>
                        {locations.length ?
                            `${criteria}: ${locations[0].ORDER_NUM}` :
                            `${criteria} ${searchedNum} is not found`
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
            {locations.length && searchedNum && criteria === 'order' ?
                <MyButton onClick={uncheckIsInPlace}>Cancel</MyButton>
                : null
            }
        </div>
    );
};

export default FindPlace;