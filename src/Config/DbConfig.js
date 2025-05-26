// Pool es para manejar conexiones a la base de datos PostgreSQL
import { Pool } from 'pg';

// dotenv es para leer las variables de entorno desde un archivo .env
import dotenv from 'dotenv';

// Importamos dotenv para manejar las variables de entorno
dotenv.config();

// Creamos una nueva instancia de Pool para manejar la conexión a la base de datos
export const Connection = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 1234,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432, 
  database: process.env.DB_NAME || '',
});

