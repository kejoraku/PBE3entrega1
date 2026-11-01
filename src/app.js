import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();

// Middlewares obligatorios para procesar JSON en el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vinculación del router bajo la ruta base de la consigna
app.use('/api/mocks', mocksRouter);

// Conexión a la Base de Datos e inicio del servidor
mongoose.connect(config.mongoUrl)
    .then(() => {
        console.log('🚀 Conectado con éxito a MongoDB');
        app.listen(config.port, () => {
            console.log(`💻 Servidor escuchando en http://localhost:${config.port}`);
        });
    })
    .catch(error => {
        console.error('❌ Error crítico al conectar a la base de datos:', error.message);
    });

export default app;
