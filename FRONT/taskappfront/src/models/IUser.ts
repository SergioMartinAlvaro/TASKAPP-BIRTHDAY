export interface IUser {
    id: string,
    name: string,
    password: string,
    role: string,
    dataAllTasksCompleted?: Date | null
  }

export const emptyUser:IUser = {
  id: '',
  name: '',
  password: '',
  role: '',
  dataAllTasksCompleted: null
}