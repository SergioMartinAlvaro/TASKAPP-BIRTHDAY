import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser, emptyUser } from "../../../../models/IUser";
import { getAllUsers } from "../../../../services/userService";
import { setMenuMessage } from "../../../../store/userSlice";
import { removeTask, setAllTasks, setAllUsers } from "../../../../store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Title, { ETitleSize } from "../../../../components/Title/Title";
import { ITask, emptyTask } from "../../../../models/ITask";
import CheckboxList from "../../../user/components/CheckboxList/CheckboxList";
import { deleteTask, getAllTasksByUserId } from "../../../../services/tasksService";
import './UserInfo.scss';
import AdminFloatingButton from "../../components/AdminFloatingMenu/AdminFloatingMenu";
import { ReactComponent as ModificarIcon } from '../../../../assets/icons/Modificar.svg';
import { ReactComponent as EliminarIcon } from '../../../../assets/icons/Eliminar.svg';
import Modal from "../../../../components/Modal/Modal";
import Button, { EButtonSize, EButtonType } from "../../../../components/Button/Button";
import AdminList from "../../components/AdminList/AdminList";

const UserInfo = () => {
  const { value } = useParams<{ value: string }>();
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<IUser>(emptyUser);
  const allUsers = useSelector((state: RootState) => state.admin.allUsers);
  const allTasks = useSelector((state: RootState) => state.admin.allTasks);
  const [toDoTasks, setToDoTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [itemList, setItemList] = useState([]);
  const [taskSelected, setTaskSelected] = useState<ITask>(emptyTask);
  const [showModal, setShowModal] = useState(false);

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
          calculateTasks();
        } catch (error) {
          console.error(error);
          dispatch(setMenuMessage("Error obteniendo tareas."));
        }
      }
    };

    loadUserInfo();
  }, [allUsers, dispatch, value]);

  useEffect(() => {
    updateTaskList();
  }, [allTasks]);

  const openModal = (task: ITask) => {
    setTaskSelected(task);
    setShowModal(true);
  };

  const calculateTasks = () => {
    const toDo: ITask[] = allTasks.filter((task: ITask) => !task.completed);
    const completed: ITask[] = allTasks.filter((task: ITask) => task.completed);
    setToDoTasks(toDo);
    setCompletedTasks(completed);
  };

  const updateTaskList = () => {
    if (allTasks.length > 0) {
      const newItemList = [];
      allTasks.forEach((task: ITask) => {
        newItemList.push({
          text: task.text,
          icons: {
            Modificar: { icon: <ModificarIcon />, action: () => navigate(`/edit-task/${task.id}`) },
            Eliminar: { icon: <EliminarIcon />, action: () => openModal(task) },
          },
        });
      });
      setItemList(newItemList);
    }
  };

  const deleteTaskAsync = async () => {
    try {
      await deleteTask(taskSelected.id);
      dispatch(setMenuMessage('Tarea borrada con éxito'));

      // Actualizar el estado después de borrar la tarea
      dispatch(removeTask(taskSelected));

      setTaskSelected(emptyTask);
    } catch (error) {
      console.error('Error borrando la tarea', error);
      dispatch(setMenuMessage('Error borrando la tarea'));
      setTaskSelected(emptyTask);
    } finally {
      setShowModal(false);
    }
  };

  const menuButtons = [
    { text: "Añadir tarea", action: () => { navigate(`/add-task/${selectedUser.id}`) } },
    { text: "Ver llaves", action: () => { } }
  ];

  const buttons = [
    <Button
      key="button1"
      onClick={() => { deleteTaskAsync() }}
      text="Borrar"
      buttonType={EButtonType.Main}
      buttonSize={EButtonSize.LargeButton}
    />,
  ];

  return (
    <div className="userInfo">
      <div className="userInfo__titleContainer">
        <p className="userInfo__text">Usuario:</p>
        <h2 className="userInfo__title">{selectedUser.name}</h2>
      </div>
      <div className="titleContainer">
        <Title text="Tareas asignadas" size={ETitleSize.Small} />
      </div>
      <div className="listContainer">
        <AdminList items={itemList} />
      </div>
      <AdminFloatingButton options={menuButtons} />
      {showModal && <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        buttons={buttons}
        title=""
      >
        <p style={{ marginBottom: "24px" }}>¿Estás seguro de que quieres eliminar esta tarea?</p>
      </Modal>}
    </div>
  );
};

export default UserInfo;
