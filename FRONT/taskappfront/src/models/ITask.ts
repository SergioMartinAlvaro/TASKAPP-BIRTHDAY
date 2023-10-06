import { IUser } from "./IUser";

export interface ITask {
    id: string,
    text: string,
    userImplicated: IUser,
    userAssigned: IUser,
    completed: boolean,
    description: string
  }