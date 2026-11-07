import { userModel } from '../dao/models/User.js';

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
};
