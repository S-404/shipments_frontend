import React, {useEffect, useState} from 'react';
import MySelect from "../../../UI/select/mySelect";
import {pad} from "../../../../utils/formats";

const LoadingTimePicker = ({updateLoadingTime_HHMM,selectedPlace}) => {
    const [loadingTime, setLoadingTime] = useState({HH: '00', MM: '00'})
    useEffect(() => {

        if (selectedPlace.LOADING_TIME_HH) {
            setLoadingTime({
                HH: selectedPlace.LOADING_TIME_HH,
                MM: selectedPlace.LOADING_TIME_MM,
            })

        } else {
            setLoadingTime({HH: '00', MM: '00'})
        }

    }, [selectedPlace])

    const [hhArr, setHHArr] = useState([])
    const [mmArr, setMMArr] = useState([])

     const getHHArr = ()=>{
        let resultArr = [];
        for(let hh = 0; hh<=23; hh++){
            resultArr.push({name:pad(hh,2),value:pad(hh,2)})
        }
        return resultArr;
    }
      const getMMarr = ()=>{
        let resultArr = [];
        for(let mm = 0; mm<=59; mm+=15){
            resultArr.push({name:pad(mm,2),value:pad(mm,2)})
        }
        return resultArr;
    }


    useEffect(() => {
        setHHArr(getHHArr());
        setMMArr(getMMarr());
    }, []);


    return (
        <div className='gate-place-form__loading-time-div'>
            <span className='loading-time-div__header'>Loading Time</span>
            <div className='loading-time-div__time-picker'>
                <MySelect
                    className='time-picker__select'
                    onChange={
                        (selectedHH) => {
                            setLoadingTime({...loadingTime, HH: selectedHH});
                            updateLoadingTime_HHMM(selectedHH, loadingTime.MM, selectedPlace.PLACE_ID);
                        }
                    }
                    options={hhArr}
                    value={loadingTime.HH}
                />
                <span className={'time-picker__separator'}>:</span>
                <MySelect
                    className={'time-picker__select'}
                    onChange={
                        (selectedMM) => {
                            setLoadingTime({...loadingTime, MM: selectedMM});
                            updateLoadingTime_HHMM(loadingTime.HH, selectedMM, selectedPlace.PLACE_ID)
                        }
                    }
                    options={mmArr}
                    value={loadingTime.MM}
                />
            </div>
        </div>
    );
};

export default LoadingTimePicker;