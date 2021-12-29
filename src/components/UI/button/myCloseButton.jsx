import React from 'react';
import classes from "./myCloseButton.module.css";

const MyCloseButton = ({...props}) => {
    return (
        <div className={classes.myCloseButton} {...props}>✕</div>
    );
};

export default MyCloseButton;