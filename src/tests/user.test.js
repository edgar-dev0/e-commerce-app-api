const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users should create user record', async () => {
  const body = {
    firstName: 'Ailyn',
    lastName: 'Moreno',
    email: 'ailyn6@gmail.com',
    password: 'quesopiedra',
    phone: '348-612-763'
  };
  const res = await request(app).post('/users').send(body);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(body.firstName);
});

test('POST /users/login should login user', async () => {
  const body = {
    email: 'ailyn6@gmail.com',
    password: 'quesopiedra'
  };
  const res = await request(app)
    .post('/users/login')
    .send(body);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});
 
test('GET /users should get all users records', async () => {
  const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id should update an user record by id', async () => {
  const body = {
    firstName: 'Edgar',
    lastName: 'Moreno',
    email: 'edgarm.dev@gmail.com',
    password: '34jHz$39Qa.',
    phone: '689-888-954'
  };
  const res = await request(app)
    .put(`/users/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /users/:id  should delete an user record by id', async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});