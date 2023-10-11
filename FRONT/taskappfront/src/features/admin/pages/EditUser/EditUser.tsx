import React, { useEffect, useState } from 'react'
import Form, { IFieldConfig } from '../../../../components/Form/Form';
import { useParams } from 'react-router-dom';
import { IUser, emptyUser } from '../../../../models/IUser';
import { RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import './EditUser.scss';
import { getAllUsers, updatedUser } from '../../../../services/userService';
import { setMenuMessage } from '../../../../store/userSlice';
import { editUser, setAllUsers } from '../../../../store/adminSlice';
import loadingImage from "../../../../assets/images/peeps/loading.svg";
import Loading from '../../../../components/Loading/Loading';

const EditUser = () => {

    const { value } = useParams<{ value: string }>();
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState<IUser>(emptyUser);
    const allUsers = useSelector((state: RootState) => state.admin.allUsers);
    const [username, setUsername] = useState<string>(selectedUser ? selectedUser.name : '');
    const [password, setPassword] = useState<string>(selectedUser ? selectedUser.password : '')

    useEffect(() => {
        const getAllUsersAsync = async () => {
            await getAllUsers().then(data => {
                dispatch(setAllUsers(data));
            }).catch((e) => {
                console.log(e);
                dispatch(setMenuMessage('Error obteniendo usuarios.'))
            })
        }
        const loadUserInfo = async () => {
            if(allUsers.length > 0) {
                const user:IUser = allUsers.find((user: IUser) => user.id === value);
                setSelectedUser(user);
                setUsername(user.name);
                setPassword(user.password)
            } else {
               await getAllUsersAsync()
            }
        }

        loadUserInfo();
    }, [])

    useEffect(() => {
        if(allUsers.length > 0) {
            const user:IUser = allUsers.find((user: IUser) => user.id === value);
            setSelectedUser(user);
            setUsername(user.name);
            setPassword(user.password)
        }

    }, [allUsers])

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
        { type: 'input', name: 'name', placeholder: 'Nombre', onChange: (e) => changeUserName(e), value: `${username}`},
        { type: 'input', name: 'password', placeholder: 'Contraseña', onChange: (e) => changePassword(e), value: `${password}`},
      ];
      
  return (
    <div className='editUser'>
        {selectedUser.id !== '' ? <Form fields={fieldsConfig} submitAction={handleEdit}></Form>
        : <Loading text='Cargando... ¿Sabías que el kiwi, además de una fruta es un pájaro?' image={loadingImage} />}
    </div>

  )
}

export default EditUser;