import { Container } from "@azure/cosmos";
import { IUser } from "./userModel";
import { database } from "../services/cosmosdbService";

class Key {
    public id: string;
    public name: string;
    public email: string;
  
    constructor(id: string, name: string, email: string) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }
  
  export default Key;
  
  export interface IKey {
    id: string,
    text: string,
    assignedTo: IUser
  }
  
  export const keysContainer: Container = database.container('Keys');