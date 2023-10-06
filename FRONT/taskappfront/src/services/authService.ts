import config from "../config/config";
import axios from "axios";

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
export const login = async (username: string, password: string) => {
  try {
    // Realizar una solicitud POST a /login con los datos de inicio de sesión
    const response = await api.post(`users/getUserByCredentials`, {
      username: username,
      password: password,
    });

    // Si la solicitud es exitosa, devuelve los datos de usuario
    return response.data;
  } catch (error) {
    // Si hay un error en la solicitud, maneja el error o lanza una excepción
    throw error.response?.data || error.message;
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    // Realizar una solicitud POST a /logout u otra ruta para cerrar sesión
    const response = await axios.post(`${apiUrl}/logout`);

    // Si la solicitud es exitosa, devuelve los datos de respuesta (puede ser un mensaje)
    return response.data;
  } catch (error) {
    // Si hay un error en la solicitud, maneja el error o lanza una excepción
    throw error.response?.data || error.message;
  }
};
