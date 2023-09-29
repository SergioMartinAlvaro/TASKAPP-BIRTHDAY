import { Container } from "@azure/cosmos";
import { IUser } from "./userModel";
import { database } from "../services/cosmosdbService";

class Task {
    public id: string;
    public name: string;
    public email: string;
  
    constructor(id: string, name: string, email: string) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }
  
  export default Task;

  export interface ITask {
    id: string,
    text: string,
    userImplicated: IUser,
    userAssigned: IUser,
    completed: boolean,
    description: string
  }
  
  export const tasksContainer: Container = database.container('Tasks');