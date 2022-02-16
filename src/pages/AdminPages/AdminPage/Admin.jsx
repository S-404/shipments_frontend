import React from 'react';
import {useSelector} from "react-redux";
import NavPage from "../../../components/NavPage/NavPage";

const Admin = () => {

    const access = useSelector(state => state.access)
    const adminOptions = [
        {name: 'Manage Access', to: '/admin/access'},
        {name: 'Manage Shipping Area', to: '/admin/shipping-area'},
    ]
    if (!access?.admin?.read) return ( <span>You don't have permission to access</span>)
    return (
        <NavPage options={adminOptions} header={'Admin Page'}/>
    )
};

export default Admin;