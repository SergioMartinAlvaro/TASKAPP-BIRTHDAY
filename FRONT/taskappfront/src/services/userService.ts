import config from "../config/config";
import axios from "axios";
import { IUser } from "../models/IUser";
import { v4 as uuidv4 } from "uuid";

const apiUrl = config.apiUrl;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
const api = axios.create({
  baseURL: apiUrl, // Reemplaza con la URL de tu servidor
  withCredentials: true, // Permite enviar cookies y credenciales en la solicitud
});

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

// Función para iniciar sesión
export const getAllUsers = async () => {
  try {
    // Realizar una solicitud POST a /login con los datos de inicio de sesión
    const response = await api.get(`users/getAllUsers`);

    // Si la solicitud es exitosa, devuelve los datos de usuarios
    return response.data;
  } catch (error) {
    // Si hay un error en la solicitud, maneja el error o lanza una excepción
    throw error.response?.data || error.message;
  }
};

export const updatedUser = async (userId: string, userData: IUser) => {
  try {
    const response = await api.put(`users/updateUser/${userId}`, {
      id: userData.id,
      name: userData.name,
      password: userData.password,
      role: userData.role
    });
  } catch (error) {
    // Si hay un error en la solicitud, maneja el error o lanza una excepción
    throw error.response?.data || error.message;
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`users/deleteUser/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const createUser = async (user: IUser) => {
  try {
    const response = await api.post(`users/createUser`, {
      id: uuidv4(),
      name: user.name,
      password: user.password,
      role: user.role
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const setDateCompletedAllTasks = async (userId: string, date: string | null) => {
  try {
    const response = await api.post(`users/allTasksCompleted/${userId}`, {
      date: date
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
