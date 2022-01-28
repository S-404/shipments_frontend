import React, {useState} from 'react';
import ToggleSwitch from "../../UI/checkbox/toggleSwitch";
import MyInput from "../../UI/input/myInput";
import MySmallButton from "../../UI/button/mySmallButton";

const OrderListInputs = ({selectedPlace, addOrder}) => {

    const [isMassUpload, setIsMassUpload] = useState(false)
    const [newOrder, setNewOrder] = useState('')

    const massUpload = (str) => {
        let checkOrderListArr = str.split(' ')
        let orderListArr = []
        const isValid = (value) => {
            if (!value) return false;
            for (let x = 0; x < value.length; x++) {
                if (isNaN(value[x])) return false;
            }
            return true;
        }
        for (let x = 0; x < Math.min(50, checkOrderListArr.length); x++) {
            if (isValid(checkOrderListArr[x])) {
                orderListArr.push(checkOrderListArr[x])
            }
        }
        if (orderListArr.length) addNewOrder(orderListArr.join(' '))
    }
    const addNewOrder = (orderNum) => {
        if (!orderNum.length) return;
        let newOrderObj = {
            PLACE_ID: selectedPlace.PLACE_ID,
            GATE: selectedPlace.GATE,
            PLACE: selectedPlace.PLACE,
            ORDER_NUM: orderNum,
            ORDER_ID: Date.now(),
        }
        addOrder(newOrderObj);
        setNewOrder('')
    }

    return (
        <div className='order-list__input-div'>
            <ToggleSwitch
                text='Mass Upload'
                checked={isMassUpload}
                onChange={() => setIsMassUpload(!isMassUpload)}
            />
            {isMassUpload ?
                <div className='mass-upload-input'>
                    <MyInput
                        placeholder='put order list (paste from excel)'
                        value=''
                        onChange={(e) => {
                            massUpload(e.target.value)
                        }}/>
                </div>
                :
                <div className='input-div__single-order-div'>
                    <div className='single-order-div__input'>
                        <MyInput
                            labeltext='order'
                            maxLength={9}
                            placeholder='put order num'
                            value={newOrder}
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) setNewOrder(e.target.value)
                            }}/>
                    </div>
                    <div className='single-order-div__button'>
                        <MySmallButton onClick={() => addNewOrder(newOrder)} text='add'/>
                    </div>
                </div>
            }
        </div>
    );
};

export default OrderListInputs;