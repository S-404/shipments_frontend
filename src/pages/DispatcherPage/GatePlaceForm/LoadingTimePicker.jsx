import React, {useEffect, useState} from 'react';
import MySelect from "../../../components/UI/select/mySelect";
import {pad} from "../../../helpers/formats";
import {useSelector} from "react-redux";

const LoadingTimePicker = ({updateLoadingTime_HHMM,selectedPlace}) => {
    const access = useSelector(state => state.access)
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

    function changeHH(selectedHH){
        setLoadingTime({...loadingTime, HH: selectedHH});
        updateLoadingTime_HHMM(selectedHH, loadingTime.MM, selectedPlace.PLACE_ID);
    }
    function changeMM(selectedMM){
        setLoadingTime({...loadingTime, MM: selectedMM});
        updateLoadingTime_HHMM(loadingTime.HH, selectedMM, selectedPlace.PLACE_ID)
    }

    return (
        <div className='gate-place-form__loading-time-div'>
            <span className='loading-time-div__header'>Loading Time</span>

                {access?.dispatcher?.trucksAssign ?
                    <div className='loading-time-div__time-picker'>
                    <MySelect
                        className='time-picker__select'
                        onChange={(selectedHH) => changeHH(selectedHH)}
                        options={hhArr}
                        value={loadingTime.HH}
                    />
                    <span className={'time-picker__separator'}>:</span>
                    <MySelect
                    className={'time-picker__select'}
                    onChange={(selectedMM) => changeMM(selectedMM)}
                    options={mmArr}
                    value={loadingTime.MM}
                    />
                    </div>
                :
                    <div className='loading-time-div__time-picker'>
                        <span>{`${loadingTime.HH}:${loadingTime.MM}`}</span>
                    </div>
                }


        </div>
    );
};

export default LoadingTimePicker;