import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import LoginService from "../../../api/LoginService";
import MyModal from "../../UI/modal/myModal";
import UserAccessForm from "./userAccessForm";
import MySmallButton from "../../UI/button/mySmallButton";
import AddUser from "./addUser";

const AccessManager = () => {

    const defaultAccess = {
        admin: {
            read: false
        },
        dispatcher: {
            read: false,
            trucksLoad: false,
            trucksAssign: false,
            placesClear: false,
            ordersListManage: false,
        },
        picker: {
            read: false
        },
    }

    const [userAccessModal, setUserAccessModal] = useState(false)
    const [newUserModal, setNewUserModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [users, setUsers] = useState([{ID: 0}])

    const [fetchUserList, isUserListLoading, isUserListError] = useFetching(async () => {
        const responseData = await LoginService.queryData({}, 'users', 'GET')
        setUsers(responseData)
    })

    const createUser = async (newUserName, newUserPassword) => {
        let param = {
            USER_LOGIN: newUserName,
            USER_PASSWORD: newUserPassword,
            USER_ACCESS: JSON.stringify({...defaultAccess})
        }
        const responseData = await LoginService.queryData(param, 'user', 'POST');
        let result = responseData[0].RESULT;
        if (result) {
            result === 'CREATED' ?
                setUsers([...users, {...responseData[0]}])
                :
                alert(`${newUserName} ${result}`);
        }
    }

    const removeUser = async (userName) =>{
        let param = {
            USER_LOGIN: userName,
        }
        console.log(userName)
        const responseData = await LoginService.queryData(param, 'user', 'DELETE');
        let user_login = responseData[0].USER_LOGIN;
        if (user_login) {
                setUsers([...users.filter(user=> user.USER_LOGIN !== user_login)])
        }
    }

    useEffect(async () => await fetchUserList(), [])
    return (
        <div className='manage-access-container__access-manager'>
            <MyModal visible={userAccessModal} setVisible={() => setUserAccessModal(false)}>
                <UserAccessForm
                    defaultAccess={defaultAccess}
                    selectedUser={selectedUser}
                    userAccessModal={userAccessModal}
                    removeUser={removeUser}
                    setVisible={() => setUserAccessModal(false)}
                />
            </MyModal>
            <MyModal visible={newUserModal} setVisible={() => setNewUserModal(false)}>
                <AddUser setVisible={() => setNewUserModal(false)} createUser={createUser}/>
            </MyModal>
            <div className='access-manager__users'>
                <h2 className='users__header'>USER LIST:</h2>
                <div className='users__user-list'>
                    {users.map(user => (
                        <div
                            key={`user_${user.ID}`}
                            className='user-list__user'
                            onClick={() => {
                                setSelectedUser({...user})
                                setUserAccessModal(true)
                            }}
                        >
                            {user.USER_LOGIN}
                        </div>
                    ))}
                    <MySmallButton
                        onClick={() => setNewUserModal(true)}
                        text='ADD USER'
                    />
                </div>
            </div>


        </div>
    );
};

export default AccessManager;