import React from 'react';
import classes from "./myCloseButton.module.css";

const MyCloseButton = ({...props}) => {
    return (
        <div className={classes.myCloseButton__div} {...props}>
            <div className={classes.myCloseButton}>✕</div>
        </div>
    );
};

export default MyCloseButton;