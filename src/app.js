import express from 'express';
import morgan from 'morgan';
import TareasRoutes from './routes/tareas.routes';
import cors from 'cors';

const app = express();

// Configuracion
app.set('port', process.env.PORT || 3000);

// Middlewares
const corsOptions = {};
app.use(cors(corsOptions))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//  Rutas
app.get('/', (req, res) => {
    res.json({ Mensaje: 'Bienvenido a RD Loterias' });
});

app.use('/api/tareas', TareasRoutes);

export default app;