import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form, { IFieldConfig, IOptionSelect } from "../../../../components/Form/Form";
import { IUser, emptyUser } from "../../../../models/IUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { createUser, getAllUsers } from "../../../../services/userService";
import { addTask, setAllUsers } from "../../../../store/adminSlice";
import { setMenuMessage } from "../../../../store/userSlice";
import './AddUser.scss'
import { createTask } from "../../../../services/tasksService";

export enum EuserType {
    ADMIN = "ADMIN",
    USER = "USER"
}

const AddUser = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.admin.allUsers);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<EuserType>(EuserType.USER)

  useEffect(() => {
    const loadUserInfo = async () => {
      if (allUsers.length === 0) {
        try {
          const data = await getAllUsers();
          dispatch(setAllUsers(data));
        } catch (error) {
          console.error(error);
          dispatch(setMenuMessage("Error obteniendo usuarios."));
          return;
        }
      } 
    };
    
    loadUserInfo();
  }, [allUsers, dispatch]);

  const handleSubmit = async () => {
    submitNewUser();
  }

  const submitNewUser = async () => {
        await createUser({
            id: '',
            name: username,
            password: password,
            role: userType
        }).then(data => {
            console.log(data)
            dispatch(setMenuMessage('Tarea creada con éxito!'))
        }).catch(() => {
            dispatch(setMenuMessage('Error al crear la tarea!'))
        })
  }

  const changeUserName = (e) => {
    setUsername(e)
  }

  const changePassword = (e) => {
    setPassword(e)
  }

  const changeRole = (e) => {
    setUserType(e)
  }

  const options:IOptionSelect[] = [{
    id: EuserType.ADMIN,
    text: "Administrador"
  },
  {
    id: EuserType.USER,
    text: "Usuario"
  }]

  const fieldsConfig: IFieldConfig[] = [
    { type: 'input', name: 'username', placeholder: 'Nombre', onChange: (e) => changeUserName(e)},
    { type: 'input', name: 'password', placeholder: 'Contraseña', onChange: (e) => changePassword(e)},
    { type: 'select', name: 'userImplicated', placeholder: 'Tipo de usuario', onChange: (e) => changeRole(e), options: options},
  ];

  return (<div className="addTask">
    <div className="addTask__titleContainer">
        <h2 className="addTask__title">Añadir usuario</h2> 
    </div>
    <Form fields={fieldsConfig} submitAction={async () => await handleSubmit()}></Form>
  </div>)
};

export default AddUser;
