import mongoose from 'mongoose';

const petCollection = 'pets';

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specie: { type: String, required: true },
    adopted: { type: Boolean, default: false }
});

export const petModel = mongoose.model(petCollection, petSchema);
