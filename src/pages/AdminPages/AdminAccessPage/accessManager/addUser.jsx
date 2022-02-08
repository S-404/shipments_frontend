import React, {useState} from 'react';
import MyInput from "../../../../components/UI/input/myInput/myInput";
import {isValidInput, isValidPassword} from "../../../../helpers/validation";
import MyButton from "../../../../components/UI/button/myButton";
import MyPasswordInput from "../../../../components/UI/input/myPasswordInput/myPasswordInput";

const AddUser = ({createUser, setVisible}) => {
    const [newUserName, setNewUserName] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')

    const addNewUser = () => {
        if (isValidPassword(newUserPassword)) {
            createUser(newUserName, newUserPassword);
            setNewUserName('')
            setNewUserPassword('')
            setVisible();
        } else {
            alert('incorrect password')
        }
    }

    function putUserID(value){
        if (isValidInput(value)) setNewUserName(value)
    }

    return (
        <div>
            <h1>Add New User</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='User ID'
                value={newUserName}
                onChange={(e) => putUserID(e.target.value)}
                labeltext='User ID'
            />
            <br/>
            <MyPasswordInput
                text='Password'
                password={newUserPassword}
                setPassword={setNewUserPassword}
            />
            <br/>
            <MyButton onClick={addNewUser}>
                Add User
            </MyButton>
        </div>
    );
};

export default AddUser;