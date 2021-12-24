import React from 'react';
import classes from "./toggleSwitch.module.css";

const ToggleSwitch = ({text, ...props}) => {
    return (
        <div className={classes.toggleSwitch}>
            <input type="checkbox" id="toggle-button" className={classes.toggleSwitch__input} {...props}/>
            <label htmlFor="toggle-button" className={classes.toggleSwitch__label}>{text}</label>
        </div>
    );
};

export default ToggleSwitch;