import { petModel } from '../dao/models/Pet.js';

export const getPets = async (req, res) => {
    try {
        const pets = await petModel.find();
        return res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};
