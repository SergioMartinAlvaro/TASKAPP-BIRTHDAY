import { Container } from "@azure/cosmos";
import { IUser } from "./userModel";
import { database } from "../services/cosmosdbService";

class Key {
  public id: string;
  public name: string;
  public email: string;
  public dateAssigned: Date; // Nueva propiedad

  constructor(id: string, name: string, email: string, dateAssigned: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.dateAssigned = dateAssigned;
  }
}

export default Key;

export interface IKey {
  id: string,
  text: string,
  assignedTo: IUser,
  dateAssigned: Date // Añadir la nueva propiedad en la interfaz
}

export const keysContainer: Container = database.container('Keys');
