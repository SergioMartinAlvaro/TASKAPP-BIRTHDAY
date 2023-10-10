import { IUser, emptyUser } from "./IUser";

export interface IKey {
    id: string,
    text: string,
    assignedTo: IUser,
    dateAssigned: string
}

export const emptyKey:IKey = {
    id: '',
    text: '',
    assignedTo: emptyUser,
    dateAssigned: new Date().toISOString()
}