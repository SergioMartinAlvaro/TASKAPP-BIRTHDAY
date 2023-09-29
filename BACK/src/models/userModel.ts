import { Container } from "@azure/cosmos";
import { IKey } from "./keyModel";
import { ITask } from "./tasksModel";
import { database } from "../services/cosmosdbService";

  export interface IUser {
    id: string,
    name: string,
    password: string,
    completed: ITask[],
    pending: ITask[],
    keys: IKey[],
    role: string
  }
  
  export const usersContainer: Container = database.container('Users');