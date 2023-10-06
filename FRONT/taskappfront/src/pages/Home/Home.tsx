import React, { useEffect, useState } from "react";
import { getAllTasksByUserId } from "../../services/tasksService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ITask } from "../../models/ITask";
import { setTaskToDo, setTasksCompleted } from "../../store/tasksSlice";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Title, { ETitleSize } from "../../components/Title/Title";
import CheckboxList from "../../features/user/components/CheckboxList/CheckboxList";
import Modal from "../../components/Modal/Modal";
import Button, {
  EButtonSize,
  EButtonType,
} from "../../components/Button/Button";
import Form, { IFieldConfig } from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const stateToDoTasks = useSelector(
    (state: RootState) => state.tasks.tasksToDo
  );
  const stateCompletedTasks = useSelector(
    (state: RootState) => state.tasks.tasksCompleted
  );

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedTask, setSelectedTask] = useState({});

  useEffect(() => {
    const getUserTasks = async () => {
      const userId = user.id;
      await getAllTasksByUserId(userId)
        .then((tasks) => {
          const taskCompleted: ITask[] = [];
          const taskToDo: ITask[] = [];
          tasks.forEach((task: ITask) => {
            if (task.completed) {
              taskCompleted.push(task);
            } else {
              taskToDo.push(task);
            }
          });
          dispatch(setTaskToDo(taskToDo));
          dispatch(setTasksCompleted(taskCompleted));
        })
        .catch((e) => {
          console.log(e);
          //  setMessage('Error obteniendo las tareas de usuario');
          // dispatch(logout())
        });
    };
    getUserTasks();
  }, []);

  const handleToggle = (id) => {
    const taskSelected: ITask = stateToDoTasks.find((task: ITask) => task.id === id);
    console.log(taskSelected)
    setSelectedTask(taskSelected[0]);
    setShowModal(true);
  };

  const closeModal = () => {
    setPassword('');
    setShowModal(false);
    setSelectedTask({});
  }

  const validateTask = () => {
    console.log(selectedTask)
  }

  const buttons = [
    <Button
      key="button1"
      onClick={validateTask}
      text="Aceptar"
      buttonType={EButtonType.Main}
      buttonSize={EButtonSize.LargeButton}
    />,
  ];

  return (
    <div className="homeContainer">
      <div className="progressBarContainer">
        <ProgressBar progress={50}></ProgressBar>
      </div>
      <div className="titleContainer">
        <Title text="Tareas por hacer" size={ETitleSize.Small} />
      </div>
      <div className="listContainer">
        <CheckboxList
          tasks={stateToDoTasks}
          isAdmin={false}
          onToggle={(e) => handleToggle(e)}
        />
      </div>
      <div className="titleContainer">
        <Title text="Tareas completadas" size={ETitleSize.Small} />
      </div>
      <div className="listContainer">
        <CheckboxList
          tasks={stateCompletedTasks}
          isAdmin={false}
          onToggle={(e) => {console.log(e)}}
        />
      </div>
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        buttons={buttons}
        title=""
      >
        <p style={{marginBottom: "24px"}}>Mas despacio velocista! Para completar la tarea el usuario con el que has interactuado debe introducir su contraseña</p>
        <Input label="" placeholder="Password" type="password" onChange={(e) => {setPassword(e.target.value)}} value={password}/>
      </Modal>
    </div>
  );
};

export default Home;
