const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async() => {
  const body = {
    email: 'testing@ti-evoluciona',
    password: '.swordfish@'
  };
  const res = await request(app).post('/users/login').send(body);
  token = res.body.token;
});

test('POST /products should create user record', async () => {
  const body = {
    title: 'Pen Tablet',
    description: 'Tablet for free draw',
    brand: 'UGEE',
    price: '150',
  };
  const res = await request(app).post('/products').send(body);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.title).toBe(body.title);
});
 
test('GET /products should get all products records', async () => {
  const res = await request(app)
    .get('/products')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('PUT /products/:id should update an user record by id', async () => {
  const body = {
    title: 'Pen Tablet',
    description: 'Tablet for free draw',
    brand: 'UGEE',
    price: '150',
  };
  const res = await request(app)
    .put(`/products/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(body.title);
});

test('DELETE /products/:id  should delete an user record by id', async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});