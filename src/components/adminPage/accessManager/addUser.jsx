import React, {useState} from 'react';
import MyInput from "../../UI/input/myInput";
import {isValidInput, isValidPassword} from "../../../utils/validation";
import MyButton from "../../UI/button/myButton";
import MyPasswordInput from "../../UI/input/myPasswordInput";

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

    return (
        <div>
            <h1>Add New User</h1>
            <br/>
            <MyInput
                maxLength={10}
                placeholder='User ID'
                value={newUserName}
                onChange={(e) => {
                    if (isValidInput(e.target.value)) setNewUserName(e.target.value)
                }}
                labeltext='User ID'
            />
            <br/>
            <MyPasswordInput
                text='Password'
                password={newUserPassword}
                setPassword={setNewUserPassword}
            />
            <br/>
            <MyButton onClick={() => {
                addNewUser()
            }}>Add User</MyButton>
        </div>
    );
};

export default AddUser;