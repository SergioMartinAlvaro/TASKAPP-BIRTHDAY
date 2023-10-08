import { Request, Response } from 'express';
import { IUser, usersContainer } from '../models/userModel';

// Lógica del controlador para operaciones CRUD de usuarios
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { resources: users } = await usersContainer.items.query("SELECT * FROM c").fetchAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los usuarios");
  }
};

const createUser = async (req: Request, res: Response) => {
  const newUser = req.body; // Asume que el cuerpo de la solicitud contiene los datos del nuevo usuario
  console.log(req.body)
  if(newUser) {
    try {
      console.log(req.body)
      const { resource: createdUser } = await usersContainer.items.create(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el usuario');
    }
  } else {
    res.status(500).send('Error al crear el usuario - no llega en el body');
  }
  }



const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const { resource: user } = await usersContainer.item(userId).read();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el usuario');
  }
};

const assignDateOfAllTasksCompletion = async (req: Request, res: Response) => {
  const userId = req.params.userId.toString();
  const date = req.body.date;
  try {
    const { resource: userToUpdate } = await usersContainer.item(userId).read<IUser>();
    if (!userToUpdate) {
      // Si no se encuentra la tarea, devolvemos null o lanzamos un error según tu lógica
      return null;
    }
    userToUpdate.dataAllTasksCompleted = date;
    const { resource: updatedUser } = await usersContainer
    .item(userToUpdate.id)
    .replace(userToUpdate);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send(`No se encontró al usuario con el id ${userId}`);
    }
  } catch (error) {
  console.error(`Error al actualizar el estado 'completed' del usuario ${userId}:`, error);
  res.status(500).send(`Error al actualizar el estado 'completed' del usuario ${userId}`);
  }
}

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUserData = req.body; // Asume que el cuerpo de la solicitud contiene los datos actualizados
  try {
    const { resource: updatedUser } = await usersContainer.item(userId).replace(updatedUserData);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el usuario');
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId.toString();
  try {
    await usersContainer.item(userId).delete();
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el usuario');
  }
};

const getUserByCredentials = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por nombre de usuario en la base de datos
    const { resources: users } = await usersContainer.items
      .query(`SELECT * FROM c WHERE c.name = "${username}"`)
      .fetchAll();

    if (users.length === 1) {
      const user = users[0];

      // Comparar la contraseña proporcionada con la contraseña almacenada en texto plano
      if (user.password === password) {
        // Autenticación exitosa
        res.json({ message: 'Autenticación exitosa', user });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la autenticación');
  }
};

export {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByCredentials,
  assignDateOfAllTasksCompletion
};
