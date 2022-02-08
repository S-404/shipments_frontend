import React from 'react';
import AccessOption from "./AccessOption";

const AccessOptions = ({access, setUserAccess, selectedUser}) => {

    const options = [
        {page: 'admin', option: 'read'},
        {page: 'dispatcher', option: 'read'},
        {page: 'dispatcher', option: 'trucksAssign'},
        {page: 'dispatcher', option: 'trucksLoad'},
        {page: 'dispatcher', option: 'ordersListManage'},
        {page: 'dispatcher', option: 'placesClear'},
        {page: 'picker', option: 'read'},
    ]

    return (
        <div className='access__options'>
            {options.map(option => (
                <AccessOption
                    key={`access_option_${option.page + option.option}`}
                    option={option}
                    access={access}
                    setUserAccess={setUserAccess}
                    selectedUser={selectedUser}
                />
            ))}
        </div>
    );
};

export default AccessOptions;