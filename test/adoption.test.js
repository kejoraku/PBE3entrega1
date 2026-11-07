import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { userModel } from '../src/dao/models/User.js';
import { petModel } from '../src/dao/models/Pet.js';
import { adoptionModel } from '../src/dao/models/Adoption.js';

const requester = supertest(app);

describe('Suite de Tests Funcionales - Módulo de Adopciones', () => {
    let mockUser;
    let mockPet;

    before(async () => {
        // Conexión aislada para pruebas
        const testMongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/adoptme_test';
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(testMongoUrl);
        }
    });

    beforeEach(async () => {
        // Limpieza profunda e inyección controlada de datos semilla
        await userModel.deleteMany({});
        await petModel.deleteMany({});
        await adoptionModel.deleteMany({});

        mockUser = await userModel.create({
            first_name: 'Test',
            last_name: 'User',
            email: 'test@user.com',
            password: 'hashedPassword123'
        });

        mockPet = await petModel.create({
            name: 'Firulais',
            specie: 'dog',
            adopted: false
        });
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it('GET /api/adoptions debe retornar un array vacío si no hay adopciones registradas', async () => {
        const { status, body } = await requester.get('/api/adoptions');
        expect(status).to.equal(200);
        expect(body).to.have.property('status', 'success');
        expect(body.payload).to.be.an('array').that.is.empty;
    });

    it('POST /api/adoptions/:uid/:pid debe vincular un usuario y una mascota procesando la adopción con éxito', async () => {
        const { status, body } = await requester.post(`/api/adoptions/${mockUser._id}/${mockPet._id}`);
        expect(status).to.equal(201);
        expect(body).to.have.property('status', 'success');
        
        // Confirmar mutación en la base de datos
        const updatedPet = await petModel.findById(mockPet._id);
        expect(updatedPet.adopted).to.be.true;
    });

    it('POST /api/adoptions/:uid/:pid debe retornar error 400 si la mascota ya se encuentra adoptada', async () => {
        mockPet.adopted = true;
        await mockPet.save();

        const { status, body } = await requester.post(`/api/adoptions/${mockUser._id}/${mockPet._id}`);
        expect(status).to.equal(400);
        expect(body).to.have.property('status', 'error');
        expect(body.error).to.equal('La mascota ya está adoptada');
    });

    it('GET /api/adoptions/:aid debe retornar un error 404 si el ID de adopción no existe', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const { status, body } = await requester.get(`/api/adoptions/${fakeId}`);
        expect(status).to.equal(404);
        expect(body).to.have.property('status', 'error');
    });
});
