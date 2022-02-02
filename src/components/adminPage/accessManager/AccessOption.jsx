import React from 'react';
import ToggleSwitch from "../../UI/checkbox/toggleSwitch";

const AccessOption = ({option, access, setUserAccess, selectedUser}) => {
    return (
        <div className='options__option'>
            <ToggleSwitch
                text={`${option.page}-${option.option}`}
                checked={access?.[option.page]?.[option.option]}
                onChange={(e) =>
                    setUserAccess(e.target.checked, selectedUser.ID, option.page, option.option)
                }
            />
        </div>
    );
};

export default AccessOption;