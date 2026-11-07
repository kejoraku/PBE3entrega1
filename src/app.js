import express from 'express';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

import config from './config/config.js';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionRouter from './routes/adoption.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración avanzada de Swagger (Documentación del módulo de Users)
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de API AdoptMe - Backend Final',
            description: 'Especificación de endpoints de la aplicación incluyendo gestión de Mocks y Users.'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`] // Busca esquemas de documentación en src/docs/
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Rutas Globales de la Aplicación
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter); // Verificación obligatoria Entrega 1
app.use('/api/pets', petsRouter);   // Verificación obligatoria Entrega 1
app.use('/api/adoptions', adoptionRouter); // Objetivo de Testing de la Entrega Final

// Manejo de conexión condicional (Previene colisiones al ejecutar entornos de test automatizados)
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.mongoUrl)
        .then(() => {
            console.log('🚀 Conectado con éxito a MongoDB');
            app.listen(config.port, () => {
                console.log(`💻 Servidor escuchando en http://localhost:${config.port}`);
                console.log(`📝 Documentación Swagger interactiva en http://localhost:${config.port}/api-docs`);
            });
        })
        .catch(error => {
            console.error('❌ Error crítico al conectar a la base de datos:', error.message);
        });
}

export default app;
