import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

// Función para encriptar la contraseña fija solicitada en la consigna
const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const generateMockUsers = (count) => {
    const users = [];
    const hashedPassword = generateHash('coder123'); // Requerimiento: contraseña 'coder123' encriptada

    for (let i = 0; i < count; i++) {
        users.push({
            _id: faker.database.mongodbObjectId(), // Simula el formato de ID de Mongo
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']), // Variación entre user y admin
            pets: [] // Array vacío obligatorio
        });
    }
    return users;
};

// ⚠️ ASEGURATE DE QUE TENGA EL 'export const' ADELANTE
export const generateMockPets = (count) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.person.firstName(), // Nombre simulado para la mascota
            specie: faker.helpers.arrayElement(['dog', 'cat', 'bird', 'rabbit']),
            adopted: false
        });
    }
    return pets;
};
