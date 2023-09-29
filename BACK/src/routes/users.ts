import { Router } from 'express';
import * as usersController from '../controllers/usersController';

const router = Router();

// Definir rutas para operaciones CRUD de usuarios
router.get('/getAllUsers', usersController.getAllUsers);
router.post('/createUser', usersController.createUser);
router.get('/getUserById/:userId', usersController.getUserById);
router.put('/updateUser/:userId', usersController.updateUser);
router.delete('/deleteUser/:userId', usersController.deleteUser);
router.post('/getUserByCredentials', usersController.getUserByCredentials)


export default router;
