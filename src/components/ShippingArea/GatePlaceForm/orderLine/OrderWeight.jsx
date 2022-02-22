import React, {useMemo} from 'react';

const OrderWeight = ({orderline}) => {


    const orderWeight = useMemo(()=>{
        let weight = orderline?.ORDER_WEIGHT;
        return weight? Math.round((weight * 10)) / 10 + 'kg': '-'
    },[orderline])



    return (
        <div className='dynamic-order-line__weight dynamic-order-line__col-2'>
            {orderWeight}
        </div>
    );
};

export default OrderWeight;