import React, {useState} from 'react';
import MyInput from "../components/UI/input/myInput";
import MySmallButton from "../components/UI/button/mySmallButton";
import {useDispatch} from "react-redux";

const Login = () => {
    const [userid, setUserid] = useState('user')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const login = () => {
        dispatch({type: 'SET_USERID', value: userid});
        localStorage.setItem('userid', userid)

        dispatch({type: 'SET_AUTH', value: true});
        localStorage.setItem('auth', 'true')
    }
    return (
        <div>
            <MyInput
                placeholder='id'
                maxLength={50}
                labeltext='user id'
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
            />
            <MyInput
                labeltext='password'
                type='password'
                placeholder='password'
            />
            <br/>
            <MySmallButton
                onClick={login}
                text='LOGIN'/>
        </div>
    );
};

export default Login;