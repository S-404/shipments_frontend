import React from 'react';
import ToggleSwitch from "../../../../components/UI/checkbox/toggleSwitch";

const AccessOption = ({option, access, setUserAccess, selectedUser}) => {
    function changeAccess(isChecked){
        setUserAccess(isChecked, selectedUser.ID, option.page, option.option)
    }
    return (
        <div className='options__option'>
            <ToggleSwitch
                text={`${option.page}-${option.option}`}
                checked={access?.[option.page]?.[option.option]}
                onChange={(e) => changeAccess(e.target.checked)}
            />
        </div>
    );
};

export default AccessOption;