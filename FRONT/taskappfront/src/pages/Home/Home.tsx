import React, { useEffect, useState } from "react";
import { completeTask, getAllTasksByUserId } from "../../services/tasksService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ITask, emptyTask } from "../../models/ITask";
import { setTaskToDo, setTasksCompleted } from "../../store/tasksSlice";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Title, { ETitleSize } from "../../components/Title/Title";
import CheckboxList from "../../features/user/components/CheckboxList/CheckboxList";
import Modal from "../../components/Modal/Modal";
import Button, {
  EButtonSize,
  EButtonType,
} from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import { login } from "../../services/authService";
import Alert, { AlertType } from "../../components/Alert/Alert";
import UserFloatingButton from "../../features/user/components/UserFloatingMenu/UserFloatingMenu";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models/IUser";
import { setDateCompletedAllTasks } from "../../services/userService";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const stateToDoTasks = useSelector(
    (state: RootState) => state.tasks.tasksToDo
  );
  const stateCompletedTasks = useSelector(
    (state: RootState) => state.tasks.tasksCompleted
  );

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedTask, setSelectedTask] = useState<ITask>(emptyTask);
  const [todoTasks, setTodoTask] = useState<ITask[]>(stateToDoTasks);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>(stateCompletedTasks); 
  const [percentage, setPercentage] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    calculateProgressBar();
    handleUserHasAllTasksCompleted(user);
  }, [completedTasks])

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
          setTodoTask(taskToDo);
          setCompletedTasks(taskCompleted);
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
    const taskSelected: ITask = todoTasks.find((task: ITask) => task.id === id);
    setSelectedTask(taskSelected);
    setMessage('');
    setShowModal(true);
  };

  const closeModal = () => {
    setPassword('');
    setShowModal(false);
    setSelectedTask(emptyTask);
  }

  const markTaskAsCompleted = () => {
    let newSelectedTask = { ...selectedTask, completed: true };
    setSelectedTask(newSelectedTask);
    setCompletedTasks([...completedTasks, newSelectedTask]);
  };

  const handleUserHasAllTasksCompleted = async (user: IUser) => {
    let currentDate = new Date().toISOString();
    debugger
    if(user.dataAllTasksCompleted) {
      if(todoTasks.length > 0) {
        currentDate = null;
        await setDateCompletedAllTasks(user.id, currentDate).then(data => {
          console.log(data);
        })
        .catch(e => {
          console.log(e)
        })
      } 
    } else {
      if(completedTasks.length > 0 && todoTasks.length === 0) {
        currentDate = new Date().toISOString();
        await setDateCompletedAllTasks(user.id, currentDate).then(data => {
          console.log(data);
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  }

  const validateTask = async () => {
    const userImplicated = selectedTask.userImplicated;
    await login(userImplicated.name, password).then(async (data) => {
        await completeTask(selectedTask.id).then(data => {
          const tasksToDo = todoTasks.filter((task: ITask) => task.id !== selectedTask.id);

          /** Set useStateVariables  */
          markTaskAsCompleted();
          setTodoTask(tasksToDo);

          /** Set store */
          dispatch(setTasksCompleted(completedTasks))
          dispatch(setTaskToDo(todoTasks))

          setSelectedTask(emptyTask)

          setShowModal(false);
          setMessage('Tarea completada con éxito');

        }).catch((e) => {
          setShowModal(false);
          setMessage('No se ha podido completar la tarea. Prueba otra vez.')
        })
    }).catch(e => {
      setShowModal(false);
      setMessage('Te he pillado! Esa no es la contraseña!')
    })
  }

  const calculateProgressBar = () => {
    const numberOfToDoTasks = todoTasks.length;
    const numberOfCompletedTasks = completedTasks.length;
    const totalNumberOfTasks = numberOfCompletedTasks + numberOfToDoTasks;
    const percentageCompleted = (numberOfCompletedTasks / totalNumberOfTasks) * 100;
    setPercentage(percentageCompleted)
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
      {message && <Alert message={message} type={AlertType.Success} /> } 
      <div className="progressBarContainer">
        <ProgressBar progress={percentage}></ProgressBar>
      </div>
      <div className="titleContainer">
        <Title text="Tareas por hacer" size={ETitleSize.Small} />
      </div>
      <div className="listContainer">
        <CheckboxList
          tasks={todoTasks}
          isAdmin={false}
          onToggle={(e) => handleToggle(e)}
        />
      </div>
      <div className="titleContainer">
        <Title text="Tareas completadas" size={ETitleSize.Small} />
      </div>
      <div className="listContainer">
        <CheckboxList
          tasks={completedTasks}
          isAdmin={false}
          onToggle={(e) => {}}
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
      <UserFloatingButton onClick={() => {navigate('/classification')}} />
    </div>
  );
};

export default Home;
