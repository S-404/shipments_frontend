import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import LoginService from "../../../api/LoginService";
import AccessOptions from "./AccessOptions";
import MyButton from "../../UI/button/myButton";
import MyPasswordInput from "../../UI/input/myPasswordInput";
import MySmallButton from "../../UI/button/mySmallButton";
import {isValidPassword} from "../../../utils/validation";
import LoaderSmall from "../../UI/loader/loaderSmall";

const UserAccessForm = ({defaultAccess,selectedUser, userAccessModal, removeUser,setVisible}) => {

    const [access, setAccess] = useState( Object.assign (defaultAccess))
    const [updateStatus, setUpdateStatus] = useState(' ')
    const [password, setPassword] = useState('')


    const JSONaccess = (strObj) => {
        let obj = {}
        if (strObj) {
            obj = JSON.parse(strObj)
        }
        return obj
    }

    const [updUserPassword, isUpdUserPasswordLoading, isUpdUserPasswordLoadingError] = useFetching(
        async (newPassword, USER_LOGIN) => {
            const param = {
                USER_LOGIN,
                USER_PASSWORD: newPassword
            }
            const responseData = await LoginService.queryData(param, 'user/password', 'PUT')
            if (responseData[0]?.USER_LOGIN) {
                setUpdateStatus('password updated')
            }
        })

    const [updUserAccess, isUpdUserAccessLoading, isUpdUserAccessLoadingError] = useFetching(async (newAccess, USER_LOGIN) => {
        const param = {
            USER_LOGIN,
            USER_ACCESS: JSON.stringify({...newAccess})
        }
        const responseData = await LoginService.queryData(param, 'user/access', 'PUT')
        if (responseData[0]?.USER_LOGIN) {
            setAccess({...newAccess})
        }
    })


    useEffect(() => {
        if (userAccessModal) {
            setAccess({...defaultAccess, ...JSONaccess(selectedUser?.USER_ACCESS)})
            setPassword('')
            setUpdateStatus('')
        }
    }, [selectedUser, userAccessModal])


    const setNewPassword = async () => {
        if (isValidPassword(password)) {
            await updUserPassword(password, selectedUser.USER_LOGIN)
        } else {
            alert('incorrect password')
        }
    }
    const setUserAccess = async (val, id, page, option) => {
        const newAccess = {...access, [page]: {...access[page], [option]: val}}
        await updUserAccess(newAccess, selectedUser.USER_LOGIN)
    }


    return (
        <div className='access-manager__user'>
            <div className='user__loader-div'>
                <LoaderSmall isLoading={isUpdUserPasswordLoading || isUpdUserAccessLoading}/>
            </div>
            <h2 className='user__name'>{selectedUser.USER_LOGIN}</h2>
            <div className='user__access'>
                {selectedUser.USER_LOGIN !== 'admin' &&
                    <AccessOptions
                        setUserAccess={setUserAccess}
                        selectedUser={selectedUser}
                        access={access}
                    />
                }
            </div>
            <div className='user__password-div'>
                <div className='password-div__password'>
                    <MyPasswordInput
                        text='new password'
                        password={password}
                        setPassword={setPassword}
                    />
                </div>
                <div className='password_div__button'>
                    <MySmallButton onClick={setNewPassword} text='set'/>
                </div>
            </div>
            <div>
                <span>{updateStatus}</span>
            </div>
            <div className='user__buttons-div'>
                {selectedUser.USER_LOGIN !== 'admin' &&
                    <MyButton onClick={()=> {
                        if(window.confirm(`Remove User ${selectedUser.USER_LOGIN}`)){
                            removeUser(selectedUser.USER_LOGIN);
                            setVisible()
                        }

                    }}>Remove User</MyButton>
                }
            </div>

        </div>
    );
};

export default UserAccessForm;