import { Router } from 'express';
import * as keysController from '../controllers/keysController';

const router = Router();

// Definir rutas para operaciones CRUD de usuarios
router.get('/getAllKeys', keysController.getAllKeys);
router.post('/createKey', keysController.createKey);
router.get('/getKeyById/:keyId', keysController.getKeyById);
router.put('/updateKey/:keyId', keysController.updateKey);
router.delete('/deleteKey/:keyId', keysController.deleteKey);
router.put('/assignKey/:keyId', keysController.assignKey);
router.get('/getKeysByUserId/:userId', keysController.getKeyByUserId);

export default router;
