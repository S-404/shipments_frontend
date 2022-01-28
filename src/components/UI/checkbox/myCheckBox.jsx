import React from 'react';
import classes from "./myCheckBox.module.css";

const MyCheckBox = ({text, ...props}) => {
    return (
        <div className={classes.myCheckBox}>
            <input type="checkbox" id="myCheckBox__button" className={classes.myCheckBox__button} {...props}/>
            <label htmlFor="myCheckBox__button" className={classes.myCheckBox__label}>{text}</label>
        </div>
    );
};

export default MyCheckBox;