import React, {useState} from 'react';
import MyInput from "../../components/UI/input/myInput/myInput";
import MySmallButton from "../../components/UI/button/mySmallButton";
import {useDispatch} from "react-redux";
import showPasswordIcon from '../../assets/show.svg'
import hidePasswordIcon from '../../assets/hide.svg'
import './loginPage.scss'
import {isValidInput} from "../../helpers/validation";
import LoaderSmall from "../../components/UI/loader/loaderSmall/loaderSmall";
import AccessService from "../../api/AccessService";

const Login = () => {
    const dispatch = useDispatch();

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInput, setPasswordInput] = useState(null);

    const [isLoading, setIsLoadin] = useState(false)

    const checkPass = async () => {
        setIsLoadin(true)
        const responseData = await AccessService.checkPassword({
            USER_LOGIN: userid,
            USER_PASSWORD: password,
        });
        setIsLoadin(false)
        return responseData[0]
    }

    const tryLogin = async () => {
        if (!userid || !password) return;
        const checkPassResponse = await checkPass();
        if (checkPassResponse?.PASSWORD_CHECK) {
            login(checkPassResponse?.USER_ACCESS)
        }
    }

    const login = (access) => {
        localStorage.setItem('admin',!!access?.admin?.read)
        dispatch({type: 'SET_ADMIN_ACCESS', value: !!access?.admin?.read})

        localStorage.setItem('access', JSON.stringify(access))
        dispatch({type: 'SET_USER_ACCESS', value: access})

        localStorage.setItem('userid', userid)
        dispatch({type: 'SET_USERID', value: userid});

        localStorage.setItem('auth', JSON.stringify({value: 'true',timeStamp: Date.now()}) )
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

    function putUserID (value){
        if (isValidInput(value)) setUserid(value)
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
                    onChange={(e) => putUserID(e.target.value)}
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
                    </div>:null
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