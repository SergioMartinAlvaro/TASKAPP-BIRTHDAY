import { Request, Response } from 'express';
import Key, { IKey, keysContainer } from '../models/keyModel';

// Lógica del controlador para operaciones CRUD de usuarios
const getAllKeys = async (req: Request, res: Response) => {
  try {
    const { resources: keys } = await keysContainer.items.query("SELECT * FROM c").fetchAll();
    res.json(keys);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las llaves");
  }
};

const createKey = async (req: Request, res: Response) => {
  const newKey = req.body; // Asume que el cuerpo de la solicitud contiene los datos del nuevo usuario
  if(newKey) {
    try {
      const { resource: createdKey } = await keysContainer.items.create(newKey);
      res.status(201).json(createdKey);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear la llave');
    }
  } else {
    res.status(500).send('Error al crear la llave - no llega en el body');
  }
};

const getKeyById = async (req: Request, res: Response) => {
  const keyId = req.params.keyId;
  try {
    const { resource: key } = await keysContainer.item(keyId).read();
    res.json(key);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la llave');
  }
};

const getKeyByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if(userId) {
    try {
      const { resources: keys } = await keysContainer.items
      .query({
        query: 'SELECT * FROM c WHERE c.assignedTo.id = @userId',
        parameters: [
          { name: '@userId', value: userId }
        ]
      })
      .fetchAll();
      res.json(keys);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las llaves");
    }
  } else {
    res.status(500).send('Error al obtener las llaves - no llega en el body');
  }
};

const assignKey = async (req: Request, res: Response) => {
  const keyId = req.params.keyId;
  const assignedUser = req.body;
  try {
    const { resource: keyToUpdate } = await keysContainer.item(keyId).read<IKey>();
    if (!keyToUpdate) {
      // Si no se encuentra la tarea, devolvemos null o lanzamos un error según tu lógica
      return null;
    }
    // Modificamos la propiedad "completed" y guardamos la tarea actualizada
    keyToUpdate.assignedTo = assignedUser;
    const { resource: updatedKey } = await keysContainer
      .item(keyToUpdate.id)
      .replace(keyToUpdate);
    if (updatedKey) {
       res.json(updatedKey);
    } else {
      res.status(404).send(`No se encontró la llave con el id ${keyId}`);
    }
  } catch (error) {
    console.error(`Error al actualizar el usuario asignado de la llave ${keyId}:`, error);
    res.status(500).send(`Error al actualizar el usuario asignado de la llave ${keyId}`);
  }
};

const updateKey = async (req: Request, res: Response) => {
  const userId = req.params.keyId;
  const updatedKeyData = req.body; // Asume que el cuerpo de la solicitud contiene los datos actualizados
  try {
    const { resource: updatedKey } = await keysContainer.item(userId).replace(updatedKeyData);
    res.json(updatedKey);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la llave');
  }
};

const deleteKey = async (req: Request, res: Response) => {
  const keyId = req.params.keyId.toString();
  try {
    await keysContainer.item(keyId).delete();
    res.json({ message: 'Llave eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar la llave');
  }
};

export {
  getAllKeys,
  createKey,
  getKeyById,
  updateKey,
  assignKey,
  getKeyByUserId,
  deleteKey,
};
