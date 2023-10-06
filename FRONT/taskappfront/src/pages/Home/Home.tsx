import React, { useEffect } from 'react'
import { getAllTasksByUserId } from '../../services/tasksService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ITask } from '../../models/ITask'
import { setTaskToDo, setTasksCompleted } from '../../store/tasksSlice'

const Home = () => {

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const getUserTasks = async () => {
      const userId = user.id;
      await getAllTasksByUserId(userId).then((tasks) => {
        const taskCompleted: ITask[] = [];
        const taskToDo: ITask[] = [];
        tasks.forEach((task: ITask) => {
          if(task.completed) {
            taskCompleted.push(task);
          } else {
            taskToDo.push(task);
            console.log(taskToDo)
          }
        })
        dispatch(setTaskToDo(taskToDo));
        dispatch(setTasksCompleted(taskCompleted));
      }).catch((e) => {
        console.log(e);
      //  setMessage('Error obteniendo las tareas de usuario');
       // dispatch(logout())
      })
    }
    getUserTasks();
  }, [])

  return (
    <div>{user.name}</div>
  )
}

export default Home