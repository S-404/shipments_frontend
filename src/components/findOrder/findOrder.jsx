import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/myInput/myInput";

const FindOrder = ({shippingArea, setPlaceModal, setSelectedPlace}) => {

    const [orderNum, setOrderNum] = useState('')
    const [places, setPlaces] = useState([])

    const putOrderNum = (value) => {
        if (!isNaN(value)) setOrderNum(value)
    }

    useEffect(() => {
        if (orderNum.length === 9) {
            setPlaces(shippingArea.filter(order => order.ORDER_NUM === orderNum))
        }
        if (orderNum === '') {
            setPlaces([])
        }
    }, [orderNum, shippingArea])



    function selectPlace(place){
        console.log(place)
        setSelectedPlace({
            PLACE_ID: place.ID,
            GATE: place.GATE,
            PLACE: place.PLACE,
            IS_LOADING: place.IS_LOADING,
            TRUCK: place.TRUCK,
            LOADING_TIME_HH: place.LOADING_TIME_HH,
            LOADING_TIME_MM: place.LOADING_TIME_MM,
        });
        setPlaceModal(true);
    }

    return (
        <div className='dispatcher-form__find-order'>
            <div className='find-order__input'>
                <MyInput
                    value={orderNum}
                    onChange={(e) => putOrderNum(e.target.value)}
                    placeholder={'find order number'}
                    maxLength={9}
                    labeltext={'order number'}
                />
            </div>

            <div className='find-order__places'>
                {places.map(place => (
                    <div
                        key={`find-order_place${place.PLACE_ID}`}
                        className='find-order__place'
                        onClick={()=>selectPlace(place)}
                    >
                        GATE {place.GATE} - {place.PLACE}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindOrder;