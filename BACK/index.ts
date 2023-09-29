import express from 'express';
import bodyParser from 'body-parser';
// Configuración de Express
const app = express();
app.use(bodyParser.json());

// Rutas
import usersRoutes from './src/routes/users';
import keysRoutes from './src/routes/keys';
import tasksRoutes from './src/routes/tasks';

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Configurar rutas
app.use('/users', usersRoutes);
app.use('/keys', keysRoutes);
app.use('/tasks', tasksRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
