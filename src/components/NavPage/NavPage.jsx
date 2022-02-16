import React from 'react';
import {Link} from "react-router-dom";
import './navPage.scss'

const NavPage = ({options, header}) => {
    return (
        <div className='page-container'>
            <h1 className='page-container__header'>{header}</h1>
            <div className={`page-container__links`}>
                {options.map((option, index) => (
                    <div key={'option_' + option.name + index} className='links__link-div'>
                        <h3 className='link-div__header'>{`${option.name}`}</h3>
                        <div className='link-div__link'>
                            <Link to={option.to}>{option.to}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavPage;