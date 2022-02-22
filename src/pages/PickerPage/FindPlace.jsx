import React, {useState} from 'react';
import MyInput from "../../components/UI/input/myInput/myInput";
import MyLoader from "../../components/UI/loader/myLoader/myLoader";
import {useFetching} from "../../hooks/useFetching";
import OrdersService from "../../api/OrdersService";
import scanBarcode from "../../assets/scan_barcode.svg";
import MyButton from "../../components/UI/button/myButton";
import ClearButton from "../../components/UI/button/clearButton";
import {useInterval} from "../../hooks/useInterval";
import LocationsList from "./LocationsList";

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
        <div className='picker-page__find-place'>
            <div className='find-place__barcode'>
                <img  alt='scanBarcode' src={scanBarcode}/>
            </div>
            <div className='find-place__input-div'>
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
                <div className='find-place__loader-div'><MyLoader/></div>
                :
                <LocationsList
                    locations={locations}
                    searchedNum={searchedNum}
                    criteria={criteria}
                />
            }
            {locations.length && searchedNum && criteria === 'order' ?
                <div className='find-place__cancel-button'>
                    <MyButton onClick={uncheckIsInPlace}>Cancel</MyButton>
                </div>

                : null
            }
        </div>
    );
};

export default FindPlace;