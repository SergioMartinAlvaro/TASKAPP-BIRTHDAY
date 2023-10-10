import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../../services/userService";
import { getAllTasksByUserId } from "../../../../services/tasksService";
import { IUser } from "../../../../models/IUser";
import { ITask } from "../../../../models/ITask";
import { IExtendedUser } from "../../../../models/IExtendedUser";
import Loading from "../../../../components/Loading/Loading";
import loadingImage from "../../../../assets/images/peeps/loading.svg";
import ClassificationList from "../../components/ClassificationList/ClassificationList";
import { useDispatch, useSelector } from "react-redux";
import { setMenuMessage } from "../../../../store/userSlice";
import { RootState } from "../../../../store/store";

export interface ICompleteInconpleteTasks {
  completed: number;
  incompleted: number;
}

const Classification = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userTotalRanking, setUserTotalRanking] = useState<IExtendedUser[]>([]);
  const [sortedRanking, setSortedRanking] = useState<IExtendedUser[]>([]);
  const dispatch = useDispatch();

  const calculateMenuText = () => {
    const posicion = sortedRanking.findIndex(persona => persona.name === user.name);
    if (posicion !== -1) {
      const longitudArray = sortedRanking.length;
    
      if (posicion < 3) {
        dispatch(setMenuMessage('Wow! En el podio crack!'))
      } else if (posicion >= longitudArray - 3) {
        dispatch(setMenuMessage('Sigamos remando, pa\'rriba!!'))
      } else {
        dispatch(setMenuMessage('Pero bueno! A hacer tareas!'))
      }
    } else {
 
    }
  }

  useEffect(() => {
    dispatch(setMenuMessage(`Ya queda menos para la 33!`));
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const usersData = await getAllUsers();
        setUsers(usersData);

        const tasksPromises = usersData.map(async (user: IUser) => {
          const tasks = await getAllTasksByUserId(user.id);
          const tasksCompleted: number = tasks.filter(
            (task: ITask) => task.completed
          ).length;
          const tasksIncompleted: number = tasks.filter(
            (task: ITask) => !task.completed
          ).length;
          return {
            name: user.name,
            role: user.role,
            completed: tasksCompleted,
            pending: tasksIncompleted,
            dataAllTasksCompleted: user.dataAllTasksCompleted,
          };
        });

        const userRankingData = await Promise.all(tasksPromises);
        setUserTotalRanking(userRankingData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Ordenar userTotalRanking según los criterios especificados
    const sortedRanking = [...userTotalRanking].sort((a, b) => {
    
    // Verificar si ambos usuarios tienen dataAllTasksCompleted
    if (a.dataAllTasksCompleted && b.dataAllTasksCompleted) {
      // Convertir dataAllTasksCompleted a formato Date
      const dateA = new Date(a.dataAllTasksCompleted);
      const dateB = new Date(b.dataAllTasksCompleted);

      // Comparar por fecha (la fecha anterior va primero)
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }
    } else if (a.dataAllTasksCompleted) {
      // Si solo a tiene dataAllTasksCompleted, colocar a primero
      return -1;
    } else if (b.dataAllTasksCompleted) {
      // Si solo b tiene dataAllTasksCompleted, colocar b primero
      return 1;
    }
        // Comparar por tareas completadas (completed)
    if (a.completed !== b.completed) {
      return b.completed - a.completed;
    }

    // En caso de empate, comparar por tareas pendientes (pending)
    if (a.pending !== b.pending) {
      return b.pending - a.pending;
    }

    // En caso de empate en todo, comparar por el nombre alfabéticamente
    return a.name.localeCompare(b.name);
    });

    setSortedRanking(sortedRanking);
    calculateMenuText();
  }, [userTotalRanking]);

  const displayLoadingPage = () => {
    return (
      <Loading
        text="Estamos generando la tabla... Espera unos segundos"
        image={loadingImage}
      />
    );
  };

  const displayTableList = () => {
    return <ClassificationList users={sortedRanking} />;
  };

  return isLoading ? displayLoadingPage() : displayTableList();
};

export default Classification;
