import { adoptionModel } from '../dao/models/Adoption.js';
import { userModel } from '../dao/models/User.js';
import { petModel } from '../dao/models/Pet.js';

export const getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await adoptionModel.find().populate('owner').populate('pet');
        return res.status(200).json({ status: 'success', payload: adoptions });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};

export const getAdoptionById = async (req, res) => {
    try {
        const adoption = await adoptionModel.findById(req.params.aid).populate('owner').populate('pet');
        if (!adoption) return res.status(404).json({ status: 'error', error: 'Adopción no encontrada' });
        return res.status(200).json({ status: 'success', payload: adoption });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};

export const createAdoption = async (req, res) => {
    const { uid, pid } = req.params;
    try {
        const user = await userModel.findById(uid);
        const pet = await petModel.findById(pid);

        if (!user) return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });
        if (!pet) return res.status(404).json({ status: 'error', error: 'Mascota no encontrada' });
        if (pet.adopted) return res.status(400).json({ status: 'error', error: 'La mascota ya está adoptada' });

        pet.adopted = true;
        await pet.save();

        user.pets.push(pet._id);
        await user.save();

        const adoption = await adoptionModel.create({ owner: user._id, pet: pet._id });
        return res.status(201).json({ status: 'success', message: 'Adopción procesada con éxito', payload: adoption });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};
