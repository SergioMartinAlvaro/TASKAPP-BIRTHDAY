import config from "../config/config";
import axios from "axios";
import { ITask } from "../models/ITask";
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

export const getAllTasksByUserId = async (userId: string) => {
  try {
    const response = await api.get(`tasks/getAllTasksByUserId/${userId}`);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createTask = async (task: ITask) => {
  try {
    const response = await api.post("tasks/createTask", {
      id: uuidv4(),
      text: task.text,
      userImplicated: task.userImplicated,
      userAssigned: task.userAssigned,
      completed: false,
      description: "",
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const completeTask = async (taskId: string) => {
  try {
    const response = await api.post(`tasks/completeTask/${taskId}`);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
