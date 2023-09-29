import { Router } from 'express';
import * as tasksController from '../controllers/tasksController';

const router = Router();

// Definir rutas para operaciones CRUD de usuarios
router.get('/getAllTasks', tasksController.getAllTasks);
router.post('/createTask', tasksController.createTask);
router.get('/getTaskById/:taskId', tasksController.getTaskById);
router.put('/updateTask/:taskId', tasksController.updateTask);
router.delete('/deleteTask/:taskId', tasksController.deleteTask);
router.get('/getAllTasksByUserId/:taskId', tasksController.getAllTasksByUserId);
router.post('/completeTask/:taskId', tasksController.completeTask)

export default router;
