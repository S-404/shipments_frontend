import React, {useState} from 'react';
import MyInput from "../../components/UI/input/myInput/myInput";
import MyLoader from "../../components/UI/loader/myLoader/myLoader";
import {useFetching} from "../../hooks/useFetching";
import OrdersService from "../../api/OrdersService";
import scanBarcode from "../../assets/scan_barcode.svg";
import MyButton from "../../components/UI/button/myButton";
import ClearButton from "../../components/UI/button/clearButton";
import {useInterval} from "../../hooks/useInterval";

const FindPlace = ({maxLength, criteria, placeholder, minLength}) => {

    const defaultLocations = [{ORDER_NUM: '', GATE: '', PLACE: ''}]

    const [inputNum, setInputNum] = useState('')
    const [searchedNum, setSearchedNum] = useState('')
    const [locations, setLocations] = useState(defaultLocations)


    const [fetchLocation, isLocationLoading] = useFetching(async () => {
        const responseData = await OrdersService.getOrderLocation({inputNum}, criteria);
        setLocations(responseData);
        if (responseData[0]?.ORDER_NUM && criteria === 'order') {
            await OrdersService.updOrderStatus({
                ORDER_NUM: inputNum,
                IS_INPLACE: 1
            });
        }
        if (responseData[0]?.ORDER_NUM) {
            setInputNum('');
        }
    });

    const [uncheckIsInPlace] = useFetching(async () => {
        const responseData = await OrdersService.updOrderStatus({
            ORDER_NUM: searchedNum,
            IS_INPLACE: 0
        })
        if (responseData[0]?.ORDER_NUM) {
            setLocations(defaultLocations);
            setSearchedNum('')
        }

    })

    useInterval(async () => {
        if (inputNum.length >= minLength && inputNum !== searchedNum) {
            setSearchedNum(inputNum)
            await fetchLocation()
        }
    }, 1000)



    return (
        <div className='picker-form'>
            <img className='picker-form__barcode' alt='scanBarcode' src={scanBarcode}/>
            <div className='picker-form__input-div'>
                <div className='input-div__input'>
                    <MyInput
                        labeltext={inputNum.length ? `put ${maxLength}-digit ${criteria}` : null}
                        placeholder={placeholder}
                        value={inputNum}
                        maxLength={maxLength}
                        onChange={(e) => setInputNum(e.target.value)}
                    />
                </div>
                <div className='input-div__clear'>
                    {inputNum.length ? <ClearButton onClick={() => setInputNum('')}/> : null}
                </div>
            </div>
            {isLocationLoading ?
                <div className='picker-form__loader-div'><MyLoader/></div>
                :
                <div className='picker-form__locations'>
                    <div className='locations__order-num'>
                        {locations.length ?
                            `${criteria}: ${locations[0].ORDER_NUM}` :
                            <div>
                                <p>{criteria}</p>
                                <p>{searchedNum}</p>
                                <p>is not found</p>
                            </div>

                        }
                    </div>
                    <div className='locations__list'>
                        {locations.map((location, index) => (
                            <div className='list__location'
                                 key={index + location}>
                                {`GATE: ${location.GATE} - ${location.PLACE} - ${location.POSITION ? location.POSITION : 1}`}
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