import React from 'react';
import ShippingArea from "./shippingArea/shippingArea";
import {useSelector} from "react-redux";

const AdminShippingAreaPage = () => {
    const access = useSelector(state => state.access)
    if (!access?.admin?.read) return ( <span>You don't have permission to access</span>)
    return (
        <div className='manage-shipping-area-container'>
            <h1 className='manage-shipping-area-container__header'>Shipping Area Management</h1>
            <ShippingArea/>
        </div>
    );
};

export default AdminShippingAreaPage;