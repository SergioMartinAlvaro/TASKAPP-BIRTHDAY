import { IUser, emptyUser } from "./IUser";

export interface ITask {
    id: string,
    text: string,
    userImplicated: IUser,
    userAssigned: IUser,
    completed: boolean,
    description: string
  }

export const emptyTask:ITask = {
  id: "",
  text: "",
  userImplicated: emptyUser,
  userAssigned: emptyUser,
  completed: false,
  description: ""
}