export interface IUser {
    id: string,
    name: string,
    password: string,
    role: string
  }

export const emptyUser:IUser = {
  id: '',
  name: '',
  password: '',
  role: ''
}