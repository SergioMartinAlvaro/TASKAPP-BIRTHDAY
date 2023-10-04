import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Configuración de Express
const app = express();

// Opciones CORS
const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen durante el desarrollo
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

// Habilitar CORS para todas las rutas
app.use(cors(corsOptions));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Rutas
import usersRoutes from './src/routes/users';
import keysRoutes from './src/routes/keys';
import tasksRoutes from './src/routes/tasks';

// Configurar rutas
app.use('/users', usersRoutes);
app.use('/keys', keysRoutes);
app.use('/tasks', tasksRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
