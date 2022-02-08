import React from 'react';
import AccessManager from "./accessManager/AccessManager";
import './adminAccessPage.scss'
import {useSelector} from "react-redux";

const AdminAccessPage = () => {
    const access = useSelector(state => state.access)
    if (!access?.admin?.read) return ( <span>You don't have permission to access</span>)
    return (
        <div className='manage-access-container'>
            <h1 className='manage-access-container__header'>Access Management</h1>
            <AccessManager/>
        </div>
    );
};

export default AdminAccessPage;