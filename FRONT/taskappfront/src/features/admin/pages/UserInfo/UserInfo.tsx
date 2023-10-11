import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser, emptyUser } from "../../../../models/IUser";
import { getAllUsers } from "../../../../services/userService";
import { setMenuMessage } from "../../../../store/userSlice";
import { setAllTasks, setAllUsers } from "../../../../store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Title, { ETitleSize } from "../../../../components/Title/Title";
import { ITask } from "../../../../models/ITask";
import CheckboxList from "../../../user/components/CheckboxList/CheckboxList";
import { getAllTasksByUserId } from "../../../../services/tasksService";
import './UserInfo.scss';
import AdminFloatingButton from "../../components/AdminFloatingMenu/AdminFloatingMenu";
import FloatingButtonMenu from "../../components/AdminFloatingMenu/Menu/FloatingButtonMenu";

const UserInfo = () => {
  const { value } = useParams<{ value: string }>();
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<IUser>(emptyUser);
  const allUsers = useSelector((state: RootState) => state.admin.allUsers);
  const allTasks = useSelector((state: RootState) => state.admin.allTasks);
  const [toDoTasks, setToDoTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const navigate = useNavigate();
  
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

      const user: IUser = allUsers.find((user: IUser) => user.id === value) || emptyUser;
      setSelectedUser(user);

      if (user.id) {
        try {
          const tasks = await getAllTasksByUserId(user.id);
          dispatch(setAllTasks(tasks));
          calculateTasks()
        } catch (error) {
          console.error(error);
          dispatch(setMenuMessage("Error obteniendo tareas."));
        }
      }
    };

    loadUserInfo();
  }, [allUsers, dispatch, value]);

  useEffect(() => {
    calculateTasks()
  }, [allTasks])



  const calculateTasks = () => {
    const toDo:ITask[] = allTasks.filter((task:ITask) => !task.completed)
    const completed:ITask[] = allTasks.filter((task:ITask) => task.completed)
    setToDoTasks(toDo);
    setCompletedTasks(completed)
  }

  const menuButtons = [
    {text: "Añadir tarea", action: () => {navigate(`/add-task/${selectedUser.id}`)}},
    {text: "Ver llaves", action: () => {}}
  ]

  return (
    <div className="userInfo">
      <div className="userInfo__titleContainer">
        <p className="userInfo__text">Usuario:</p>
        <h2 className="userInfo__title">{selectedUser.name}</h2>
      </div>
      <div className="titleContainer">
        <Title text="Tareas por hacer" size={ETitleSize.Small} />
      </div>
      <div className="listContainer">
        {toDoTasks.length > 0 ? (
          <CheckboxList tasks={toDoTasks} isAdmin={false} onToggle={() => {}} />
        ) : (
          <div className="textContainer">
            {completedTasks.length > 0 ? 
              <p className="textContainer__text">Este usuario completó todas sus tareas</p> :
              <p className="textContainer__text">No tienes tareas asignadas</p>
            }
          </div>
        )}
      </div>
      <div className="titleContainer">
        <Title text="Tareas completadas" size={ETitleSize.Small} />
      </div>
      <div className="listContainer">
        <CheckboxList tasks={completedTasks} isAdmin={false} onToggle={() => {}} />
      </div>
      <AdminFloatingButton options={menuButtons} />

    </div>
  );
};

export default UserInfo;
