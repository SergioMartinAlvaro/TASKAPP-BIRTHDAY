import { Request, Response } from 'express';
import Task, { ITask, tasksContainer } from '../models/tasksModel';

// Lógica del controlador para operaciones CRUD de tareas
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { resources: tasks } = await tasksContainer.items.query("SELECT * FROM c").fetchAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las tareas");
  }
};

const getAllTasksByUserId = async (req: Request, res: Response) => {
  const userId = req.params.taskId;
  if(userId) {
    try {
      const { resources: tasks } = await tasksContainer.items
      .query({
        query: 'SELECT * FROM c WHERE c.userAssigned.id = @userId',
        parameters: [
          { name: '@userId', value: userId }
        ]
      })
      .fetchAll();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las tareas");
    }
  } else {
    res.status(500).send('Error al obtenerr las tareas - no llega en el body');
  }
};


const createTask = async (req: Request, res: Response) => {
  const newTask = req.body; // Asume que el cuerpo de la solicitud contiene los datos del nuevo usuario
  console.log(req.body)
  if(newTask) {
    try {
      const { resource: createdTask } = await tasksContainer.items.create(newTask);
      res.status(201).json(createdTask);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear la tarea');
    }
  } else {
    res.status(500).send('Error al crear la tarea - no llega en el body');
  }
};

const completeTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  try {
    const { resource: taskToUpdate } = await tasksContainer.item(taskId).read<ITask>();
    if (!taskToUpdate) {
      // Si no se encuentra la tarea, devolvemos null o lanzamos un error según tu lógica
      return null;
    }
    // Modificamos la propiedad "completed" y guardamos la tarea actualizada
    taskToUpdate.completed = true;
    const { resource: updatedTask } = await tasksContainer
      .item(taskToUpdate.id)
      .replace(taskToUpdate);
    if (updatedTask) {
       res.json(updatedTask);
    } else {
      res.status(404).send(`No se encontró la tarea con el id ${taskId}`);
    }
  } catch (error) {
    console.error(`Error al actualizar el estado 'completed' de la tarea ${taskId}:`, error);
    res.status(500).send(`Error al actualizar el estado 'completed' de la tarea ${taskId}`);
  }
}

const getTaskById = (req: Request, res: Response): void => {
  // Obtener un usuario por ID desde la base de datos
  // (usar el modelo y Cosmos DB SDK)
  res.json({ message: 'Obtener usuario por ID' });
};

const updateTask = async (req: Request, res: Response) => {
  const userId = req.params.taskId;
  const updatedTaskData = req.body; // Asume que el cuerpo de la solicitud contiene los datos actualizados
  try {
    const { resource: updatedTask } = await tasksContainer.item(userId).replace(updatedTaskData);
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la tarea');
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId.toString();
  try {
    await tasksContainer.item(taskId).delete();
    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar la tarea');
  }
};

export {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasksByUserId,
  completeTask
};
