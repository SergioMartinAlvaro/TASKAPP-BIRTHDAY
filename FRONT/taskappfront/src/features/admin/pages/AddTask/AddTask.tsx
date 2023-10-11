import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form, { IFieldConfig } from "../../../../components/Form/Form";
import { IUser, emptyUser } from "../../../../models/IUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { getAllUsers } from "../../../../services/userService";
import { addTask, setAllUsers } from "../../../../store/adminSlice";
import { setMenuMessage } from "../../../../store/userSlice";
import './AddTask.scss'
import { createTask } from "../../../../services/tasksService";

const AddTask = () => {
  const { value } = useParams<{ value: string }>();
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.admin.allUsers);
  const [taskName, setTaskname] = useState<string>('');
  const [userAssigned, setUserAssigned] = useState<IUser>(emptyUser);
  const [userImplicated, setUserImplicated] = useState<IUser>(emptyUser);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const loadUserInfo = async () => {
      const optionList = [];
      if (allUsers.length === 0) {
        try {
          const data = await getAllUsers();
          dispatch(setAllUsers(data));
          data.forEach((user: IUser) => {
            optionList.push({
                text: user.name,
                id: user.id
            })
        })
        } catch (error) {
          console.error(error);
          dispatch(setMenuMessage("Error obteniendo usuarios."));
          return;
        }
      } else {
        allUsers.forEach((user: IUser) => {
            optionList.push({
                text: user.name,
                id: user.id
            })
        })
      }
      setOptions(optionList);
    };
    
    loadUserInfo();
  }, [allUsers, dispatch, value]);

  const handleSubmit = async () => {
    if(value) {
        await submitToUser()
    } else {
        await submitToAll()
    }
  }

  const submitToAll = async () => {
    allUsers.forEach(async (user: IUser) => {
        await createTask({
            id: '',
            userImplicated: userImplicated,
            userAssigned: user,
            text: taskName,
            description: '',
            completed: false
        }).then(data => {
            console.log(data)
            dispatch(setMenuMessage('Tarea creada con éxito!'))
        }).catch(() => {
            dispatch(setMenuMessage('Error al crear la tarea!'))
        })
    })
  }

  const submitToUser = async () => {
        await createTask({
            id: '',
            userImplicated: userImplicated,
            userAssigned: userAssigned,
            text: taskName,
            description: '',
            completed: false
        }).then(data => {
            console.log(data)
            dispatch(setMenuMessage('Tarea creada con éxito!'))
        }).catch(() => {
            dispatch(setMenuMessage('Error al crear la tarea!'))
        })
  }

  const changeUserImplicated = (e) => {
    const foundUserImplicated = allUsers.find((user: IUser) => user.id === e)
    setUserImplicated(foundUserImplicated);
  }

  const changeUserAssigned = (e) => {
    const foundUserAssigned = allUsers.find((user: IUser) => user.id === e)
    setUserAssigned(foundUserAssigned);
  }

  const fieldsConfigAddTaskToAll: IFieldConfig[] = [
    { type: 'input', name: 'tasktext', placeholder: 'Texto de la tarea', onChange: (e) => setTaskname(e)},
    { type: 'select', name: 'userImplicated', placeholder: 'Usuario Implicado', onChange: (e) => changeUserImplicated(e), options: options}
  ];

  const fieldsConfig: IFieldConfig[] = [
    { type: 'input', name: 'tasktext', placeholder: 'Texto de la tarea', onChange: (e) => setTaskname(e)},
    { type: 'select', name: 'userImplicated', placeholder: 'Usuario Implicado', onChange: (e) => changeUserImplicated(e), options: options},
    { type: 'select', name: 'userAssigned', placeholder: 'Usuario Implicado', onChange: (e) => changeUserAssigned(e), options: options},
  ];

  return (<div className="addTask">
    <div className="addTask__titleContainer">
        {value ? <h2 className="addTask__title">Añadir tarea</h2> :
        <h2 className="addTask__title">Añadir a todos</h2>}
    </div>
    <Form fields={value ? fieldsConfig : fieldsConfigAddTaskToAll} submitAction={async () => await handleSubmit()}></Form>
  </div>)
};

export default AddTask;
