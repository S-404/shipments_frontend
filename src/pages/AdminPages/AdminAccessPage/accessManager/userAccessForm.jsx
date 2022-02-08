import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../../hooks/useFetching";
import AccessService from "../../../../api/AccessService";
import AccessOptions from "./AccessOptions";
import MyButton from "../../../../components/UI/button/myButton";
import MyPasswordInput from "../../../../components/UI/input/myPasswordInput/myPasswordInput";
import MySmallButton from "../../../../components/UI/button/mySmallButton";
import {isValidPassword} from "../../../../helpers/validation";
import LoaderSmall from "../../../../components/UI/loader/loaderSmall/loaderSmall";

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

    const [updUserPassword, isUpdUserPasswordLoading] = useFetching(async (newPassword, USER_LOGIN) => {
            const responseData = await AccessService.updPassword({
                USER_LOGIN,
                USER_PASSWORD: newPassword
            })
            if (responseData[0]?.USER_LOGIN) {
                setUpdateStatus('password updated')
            }
        })

    const [updUserAccess, isUpdUserAccessLoading] = useFetching(async (newAccess, USER_LOGIN) => {
        const responseData = await AccessService.updAccess({
            USER_LOGIN,
            USER_ACCESS: JSON.stringify({...newAccess})
        })
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

    function tryRemoveUser (){
        if(window.confirm(`Remove User ${selectedUser.USER_LOGIN}`)){
            removeUser(selectedUser.USER_LOGIN);
            setVisible()
        }}

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
                    <MyButton onClick={tryRemoveUser}>
                        Remove User
                    </MyButton>
                }
            </div>

        </div>
    );
};

export default UserAccessForm;