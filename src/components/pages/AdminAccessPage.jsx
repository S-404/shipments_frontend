import React from 'react';
import AccessManager from "../adminPage/accessManager/accessManager";
import '../../styles/adminAccessPage.scss'

const AdminAccessPage = () => {
    return (
        <div className='manage-access-container'>
            <h1 className='manage-access-container__header'>Access Management</h1>
            <AccessManager/>
        </div>
    );
};

export default AdminAccessPage;