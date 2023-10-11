import React, { useEffect, useState } from 'react'
import Form, { IFieldConfig } from '../../../../components/Form/Form';
import { useParams } from 'react-router-dom';
import { IUser, emptyUser } from '../../../../models/IUser';
import { RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import './EditUser.scss';
import { updatedUser } from '../../../../services/userService';
import { setMenuMessage } from '../../../../store/userSlice';
import { editUser } from '../../../../store/adminSlice';

const EditUser = () => {

    const { value } = useParams<{ value: string }>();
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState<IUser>(emptyUser);
    const allUsers = useSelector((state: RootState) => state.admin.allUsers);
    const [username, setUsername] = useState<string>(selectedUser.name);
    const [password, setPassword] = useState<string>(selectedUser.password);

    useEffect(() => {
        const user:IUser = allUsers.find((user: IUser) => user.id === value);
        setSelectedUser(user);
    }, [])

    const handleEdit = async () => {
        const newUser = {
            id: selectedUser.id,
            name: username ? username : selectedUser.name,
            password: password ? password : selectedUser.password,
            role: selectedUser.role,
            dataAllTasksCompleted: selectedUser.dataAllTasksCompleted ? selectedUser.dataAllTasksCompleted : null
        }

        setSelectedUser(newUser);
        await updatedUser(selectedUser.id, newUser).then(data => {
            dispatch(editUser(newUser))
            dispatch(setMenuMessage('Usuario modificado!'))
        }).catch(() => {
            dispatch(setMenuMessage('Error modificando usuario!'))
        })
    }

    const changeUserName = (e) => {
        setUsername(e);
    }

    const changePassword = (e) => {
        setPassword(e);
    }

    const fieldsConfig: IFieldConfig[] = [
        { type: 'input', name: 'name', placeholder: 'Nombre', onChange: (e) => changeUserName(e), value: `${selectedUser.name}`},
        { type: 'input', name: 'password', placeholder: 'Contraseña', onChange: (e) => changePassword(e), value: `${selectedUser.password}`},
      ];
      
  return (
    <div className='editUser'>
        <Form fields={fieldsConfig} submitAction={handleEdit}></Form>
    </div>

  )
}

export default EditUser