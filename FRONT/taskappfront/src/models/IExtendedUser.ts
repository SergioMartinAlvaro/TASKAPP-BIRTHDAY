import { ITask } from "./ITask"

export interface IExtendedUser {
    name: string,
    role: string,
    pending: number;
    completed: number;
  }

export const emptyExtendedUser:IExtendedUser = {
  name: '',
  role: '',
  pending: 0,
  completed: 0
}