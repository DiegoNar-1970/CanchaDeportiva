import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {UserRouter} from './Routers/UserRouter.js';
import {CanchaRouter} from './Routers/CanchaRouter.js';
import {HorarioDisponibleRouter} from './Routers/HorarioDisponibleRouter.js';
import {ReservaRouter} from './Routers/ReservaRouter.js';
import {FacturaRouter} from './Routers/FacturaRouter.js';


const PORT = process.env.APP_PORT ?? 3000;
const app = express();


//Configuracion del servidor
//Usamos cors para permitir solicitudes desde otros dominios
app.use(cors(
  {
    origin: '*', // Permite solicitudes desde cualquier origen
  }
));

//esta lina es para que el servidor pueda leer las variables de entorno
dotenv.config();

//Usamos express,json para que el servidor pueda recibir datos en formato JSON
app.use(express.json());

//esta configuracion es para que el cliente no vea que el backend esta hecho con express
app.disable('x-powered-by');


//Rutas

app.use('/user', UserRouter);
app.use('/user', CanchaRouter);
app.use('/user', HorarioDisponibleRouter);
app.use('/user', ReservaRouter);
app.use('/user', FacturaRouter);




app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});