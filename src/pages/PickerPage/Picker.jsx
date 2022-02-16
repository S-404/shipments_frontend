import React from 'react';
import './pickerPage.scss'
import {useSelector} from "react-redux";
import NavPage from "../../components/NavPage/NavPage";

const Picker = () => {

    const access = useSelector(state => state.access)
    const options = [
        {name: 'by OrderNum', to: '/picker/order-num'},
        {name: 'by PickID', to: '/picker/pick-id'},
    ]
    if (!access?.admin?.read) return (<span>You don't have permission to access</span>)
    return (
        <NavPage
            header={'Find order location'}
            options={options}
        />
    )

};

export default Picker;