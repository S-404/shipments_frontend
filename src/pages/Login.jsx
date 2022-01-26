import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/myInput";
import MySmallButton from "../components/UI/button/mySmallButton";
import {useDispatch} from "react-redux";
import showPasswordIcon from '../assets/show.svg'
import hidePasswordIcon from '../assets/hide.svg'
import '../styles/login.scss'
import {isValidInput} from "../utils";
import LoaderSmall from "../components/UI/loader/loaderSmall";
import LoginService from "../api/LoginService";

const Login = () => {
    const dispatch = useDispatch();

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInput, setPasswordInput] = useState(null);

    const [isLoading, setIsLoadin] = useState(false)

    const checkPass = async () => {
        setIsLoadin(true)
        const responseData = await LoginService.queryData({
            USER_LOGIN: userid,
            USER_PASSWORD: password,
        }, 'user/checkpassword', 'GET');
        setIsLoadin(false)
        return responseData[0]?.PASSWORD_CHECK

    }

    const tryLogin = async () => {
        if (!userid || !password) return;
        if (await checkPass()) {
            login()
        }
    }

    const login = () => {
        localStorage.setItem('userid', userid)
        dispatch({type: 'SET_USERID', value: userid});

        localStorage.setItem('auth', 'true')
        dispatch({type: 'SET_AUTH', value: true});

    }
    const onKeyDownPassword = (e) => {
        if (e.key === 'Enter') {
            tryLogin()
        }
    }
    const onKeyDownUserID = (e) => {
        if (e.key === 'Enter') {
            passwordInput.focus()
        }
    }

    return (
        <div className='login-form'>
            <h1 className='login-form__header'>
                {(process.env.REACT_APP_NAME).toUpperCase()} v{process.env.REACT_APP_VERSION}
            </h1>
            <div className='login-form__user-input login-form__input'>
                <MyInput
                    onKeyDown={(e) => onKeyDownUserID(e)}
                    placeholder='id'
                    maxLength={10}
                    labeltext='user id'
                    value={userid}
                    onChange={(e) => {
                        if (isValidInput(e.target.value)) setUserid(e.target.value)
                    }}
                />
            </div>
            <div className='login-form__password-input login-form__input'>
                <MyInput
                    ref={password_input => setPasswordInput(password_input)}
                    onKeyDown={(e) => onKeyDownPassword(e)}
                    placeholder='password'
                    maxLength={16}
                    labeltext='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {password.length ?
                    <div className='password-input__show-password-icon-div'>
                        <img
                            onClick={() => setShowPassword(!showPassword)}
                            className='password-input__show-password-icon'
                            alt='show/hide-pass'
                            src={showPassword ? hidePasswordIcon : showPasswordIcon}/>
                    </div>
                    : null
                }
                <div className='password-input__loader-div'>
                    <div className='loader-div__loader'>
                        <LoaderSmall isLoading={isLoading}/>
                    </div>
                </div>

            </div>
            <div className='login-form__login-button'>
                <MySmallButton
                    onClick={tryLogin}
                    text='LOGIN'/>
            </div>

        </div>
    );
};

export default Login;