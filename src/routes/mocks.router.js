import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../services/mocking.service.js';
import { userModel } from '../dao/models/User.js'; // 👈 Importación directa del modelo real
import { petModel } from '../dao/models/Pet.js';   // 👈 Importación directa del modelo real

const router = Router();

// 1. Endpoint GET /mockingpets (Migrado del Desafío 1)
router.get('/mockingpets', async (req, res) => {
    try {
        const pets = generateMockPets(10);
        res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// 2. Endpoint GET /mockingusers (Genera 50 usuarios con formato Mongo sin insertar)
router.get('/mockingusers', async (req, res) => {
    try {
        const users = generateMockUsers(50);
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// 3. Endpoint POST /generateData (Genera e inserta datos reales en la BD)
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    // Validación de parámetros numéricos requeridos
    if (users === undefined || pets === undefined || isNaN(users) || isNaN(pets)) {
        return res.status(400).json({ 
            status: 'error', 
            error: 'Los parámetros "users" y "pets" en el body son obligatorios y deben ser numéricos.' 
        });
    }

    try {
        const mockUsers = generateMockUsers(Number(users));
        const mockPets = generateMockPets(Number(pets));

        // Quitamos el _id generado por Faker para dejar que MongoDB asigne su propio ObjectId nativo al insertar
        const usersToInsert = mockUsers.map(({ _id, ...rest }) => rest);
        const petsToInsert = mockPets.map(({ _id, ...rest }) => rest);

        // Inserción directa en MongoDB usando insertMany de Mongoose
        let resultUsers = [];
        let resultPets = [];

        if (usersToInsert.length > 0) {
            resultUsers = await userModel.insertMany(usersToInsert); 
        }
        if (petsToInsert.length > 0) {
            resultPets = await petModel.insertMany(petsToInsert);
        }

        res.status(201).json({
            status: 'success',
            message: 'Datos generados e insertados exitosamente en la base de datos.',
            inserted: {
                users: resultUsers.length,
                pets: resultPets.length
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

export default router;
