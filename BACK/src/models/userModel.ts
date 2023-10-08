import { Container } from "@azure/cosmos";
import { database } from "../services/cosmosdbService";

  export interface IUser {
    id: string,
    name: string,
    password: string,
    role: string,
    dataAllTasksCompleted?: Date | null
  }
  
  export const usersContainer: Container = database.container('Users');