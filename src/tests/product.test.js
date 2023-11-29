const request = require('supertest');
const app = require('../app');
require('../models');

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

test('POST /products should create product record', async () => {
  const body = {
    title: 'Iphone 12',
    description: 'Smarthphone Iphone 12 256gb',
    brand: 'Apple',
    price: 1500,
    categoryId: 1
  };
  const res = await request(app).post('/products')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
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

test('GET /products/:id should get one product record by id', async () => {
  const res = await request(app)
    .get(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test('PUT /products/:id should update an product record by id', async () => {
  const body = {
    title: 'Hub USB',
    description: 'HUB Port C - 7 in 1',
    brand: 'UGREEN',
    price: 200
  };
  const res = await request(app)
    .put(`/products/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(body.title);
});

test('DELETE /products/:id  should delete an product record by id', async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});