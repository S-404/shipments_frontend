import React from 'react';
import ShippingArea from "../adminPage/shippingArea/shippingArea";

const AdminShippingAreaPage = () => {
    return (
        <div className='manage-shipping-area-container'>
            <h1 className='manage-shipping-area-container__header'>Shipping Area Management</h1>
            <ShippingArea/>
        </div>
    );
};

export default AdminShippingAreaPage;