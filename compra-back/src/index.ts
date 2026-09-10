import express from 'express';
import cors from 'cors'; // El paquete cors en Express es el que le da "permiso" a tu Vue para hacerle consultas Axios a Node sin que el navegador te tire un error en rojo en la consola.
import { config } from './config/config.js'; 
import { AppRoutes } from './routes/routes.js'; 
import path from 'path';
const app = express();
const port = config.port;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cors());

app.use(AppRoutes.routes);

app.listen(port, () => {
  console.log(`A ver si anda, http://localhost:${port}`);
});
