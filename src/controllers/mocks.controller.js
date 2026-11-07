import { generateMockUsers, generateMockPets } from '../services/mocking.service.js';
import { userModel } from '../dao/models/User.js';
import { petModel } from '../dao/models/Pet.js';

export const getMockingPets = async (req, res) => {
    try {
        const pets = generateMockPets(10);
        return res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};

export const getMockingUsers = async (req, res) => {
    try {
        const users = generateMockUsers(50);
        return res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};

export const generateData = async (req, res) => {
    const { users, pets } = req.body;

    if (users === undefined || pets === undefined || isNaN(users) || isNaN(pets)) {
        return res.status(400).json({ 
            status: 'error', 
            error: 'Los parámetros "users" y "pets" en el body son obligatorios y deben ser numéricos.' 
        });
    }

    try {
        const mockUsers = generateMockUsers(Number(users));
        const mockPets = generateMockPets(Number(pets));

        const usersToInsert = mockUsers.map(({ _id, ...rest }) => rest);
        const petsToInsert = mockPets.map(({ _id, ...rest }) => rest);

        let resultUsers = [];
        let resultPets = [];

        if (usersToInsert.length > 0) resultUsers = await userModel.insertMany(usersToInsert); 
        if (petsToInsert.length > 0) resultPets = await petModel.insertMany(petsToInsert);

        return res.status(201).json({
            status: 'success',
            message: 'Datos generados e insertados exitosamente en la base de datos.',
            inserted: {
                users: resultUsers.length,
                pets: resultPets.length
            }
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};
