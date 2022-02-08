import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../../hooks/useFetching";
import AccessService from "../../../../api/AccessService";
import MyModal from "../../../../components/UI/modal/myModal";
import UserAccessForm from "./userAccessForm";
import MySmallButton from "../../../../components/UI/button/mySmallButton";
import AddUser from "./addUser";
import {defaultAccessState} from "../../../../store/accessReducer";

const AccessManager = () => {

    const defaultAccess = {...defaultAccessState}

    const [userAccessModal, setUserAccessModal] = useState(false)
    const [newUserModal, setNewUserModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [users, setUsers] = useState([{ID: 0}])

    const [fetchUserList] = useFetching(async () => {
        const responseData = await AccessService.getUsersList()
        setUsers(responseData)
    })

    const createUser = async (newUserName, newUserPassword) => {
        const responseData = await AccessService.addUser({
            USER_LOGIN: newUserName,
            USER_PASSWORD: newUserPassword,
            USER_ACCESS: JSON.stringify({...defaultAccess})
        });
        let result = responseData[0].RESULT;
        if (result) {
            result === 'CREATED' ?
                setUsers([...users, {...responseData[0]}])
                :
                alert(`${newUserName} ${result}`);
        }
    }

    const removeUser = async (userName) =>{
        const responseData = await AccessService.removeUser({
            USER_LOGIN: userName,
        });
        let user_login = responseData[0].USER_LOGIN;
        if (user_login) {
                setUsers([...users.filter(user=> user.USER_LOGIN !== user_login)])
        }
    }

    useEffect(async () => await fetchUserList(), [])

    function selectUser (user){
        setSelectedUser({...user})
        setUserAccessModal(true)
    }

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
                            onClick={() => selectUser(user)}
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