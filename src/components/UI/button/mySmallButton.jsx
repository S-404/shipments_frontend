import React from 'react';
import classes from './mySmallButton.module.css';

const mySmallButton = ({text, ...props}) => {
    return (
        <button {...props} className={classes.mySmallButton}>
            {text}
        </button>
    );
};

export default mySmallButton;
