import React from 'react';
import {useSelector} from "react-redux";
import '../../styles/adminPage.scss'
import {Link} from "react-router-dom";

const Admin = () => {

    const access = useSelector(state => state.access)
    const adminOptions = [
        {name: 'Manage Access', to: '/admin/access'},
        {name: 'Manage Shipping Area', to: '/admin/shipping-area'},
    ]
    if (!access?.admin?.read) return ( <span>You don't have permission to access</span>)
    return (
            <div className='admin-page-container'>
                <h1 className='admin-page-container__header'>Admin Page</h1>
                    <div className={`admin-page-container__links`}>
                        {adminOptions.map((option, index) => (
                            <div key={'option_' + option.name + index} className='links__link-div'>
                                <h3 className='link-div__header'>{`${index + 1}. ${option.name}`}</h3>
                                <div className='link-div__link'>
                                    <Link to={option.to}>{option.to}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>

    )
};

export default Admin;