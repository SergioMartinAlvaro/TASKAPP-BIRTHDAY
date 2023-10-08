import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../../services/userService';
import { getAllTasksByUserId } from '../../../../services/tasksService';
import { IUser } from '../../../../models/IUser';
import { ITask } from '../../../../models/ITask';
import { IExtendedUser, emptyExtendedUser } from '../../../../models/IExtendedUser';
import Loading from '../../../../components/Loading/Loading';
import loadingImage from '../../../../assets/images/peeps/loading.svg';
import ClassificationList from '../../components/ClassificationList/ClassificationList';

export interface ICompleteInconpleteTasks {
    completed: number,
    incompleted: number,
}

const Classification = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [userTotalRanking, setUserTotalRanking] = useState<IExtendedUser[]>([]);
    const [sortedRanking, setSortedRanking] = useState<IExtendedUser[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
  
        try {
          const usersData = await getAllUsers();
          setUsers(usersData);
  
          const tasksPromises = usersData.map(async (user: IUser) => {
            const tasks = await getAllTasksByUserId(user.id);
            const tasksCompleted: number = tasks.filter((task: ITask) => task.completed).length;
            const tasksIncompleted: number = tasks.filter((task: ITask) => !task.completed).length;
            return { name: user.name, role: user.role, completed: tasksCompleted, pending: tasksIncompleted };
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
    }, [userTotalRanking]);

    const displayLoadingPage = () => {
        return <Loading text='Estamos generando la tabla... Espera unos segundos' image={loadingImage} />
    }

    const displayTableList = () => {
        return <ClassificationList users={sortedRanking} />
    }
  
    return (isLoading ? displayLoadingPage() : displayTableList());
}

export default Classification;





