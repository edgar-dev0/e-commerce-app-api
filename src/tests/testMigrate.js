const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');

const main = async() => {
    try{

        // Acciones a ejecutar antes de los tests
        const body = {
          firstName: 'User',
          lastName: 'Test',
          email: 'testing@ti-evoluciona',
          password: '.swordfish@',
          phone: '520 318-798'
        };
				await request(app).post('/users').send(body);

        sequelize.sync();
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();