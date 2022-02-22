import React from 'react';
import classes from './clearButton.module.css'
const ClearButton = ({...props}) => {
    return (
        <div className={classes.clearButton} {...props}>
           <span className={classes.clearButton__x}>✕</span>
        </div>
    );
};

export default ClearButton;