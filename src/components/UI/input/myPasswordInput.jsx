import React, {useState} from 'react';
import MyInput from "./myInput";
import hidePasswordIcon from "../../../assets/hide.svg";
import showPasswordIcon from "../../../assets/show.svg";
import classes from './myPasswordInput.module.css';

const MyPasswordInput = ({ref,password,onKeyDownPassword,setPassword, text}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={classes.passwordInput}>
            <MyInput
                ref={ref}
                onKeyDown={onKeyDownPassword? (e) => onKeyDownPassword(e): null}
                placeholder={text}
                maxLength={16}
                labeltext={text}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {password.length ?
                <div className={classes.passwordInput__showPasswordIconDiv}>
                    <img
                        onClick={() => setShowPassword(!showPassword)}
                        className={classes.showPasswordIconDiv__showPasswordIcon}
                        alt='show/hide-pass'
                        src={showPassword ? hidePasswordIcon : showPasswordIcon}/>
                </div>:null
            }
        </div>
    );
};

export default MyPasswordInput;