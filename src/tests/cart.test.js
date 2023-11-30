const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;
let userId;

beforeAll(async() => {
  const body = {
    email: 'testing@ti-evoluciona',
    password: '.swordfish@'
  };
  const res = await request(app).post('/users/login').send(body);
  token = res.body.token;
  userId = res.body.id;
});

test('POST /cart should create a product record in to cart', async () => {
  const body = {
    quantity: 1,
    userId: userId
  };
  const res = await request(app).post('/cart')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.quantity).toBe(body.quantity);
});

test('GET /cart should get all products added to cart', async () => {
  const res = await request(app)
    .get('/cart')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('GET /cart/:id should get one product added to cart by id', async () => {
  const res = await request(app)
    .get(`/cart/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test('PUT /cart/:id should update an product added to cart by id', async () => {
  const body = {
    quantity: 2
  };
  const res = await request(app)
    .put(`/cart/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(body.quantity);
});

test('DELETE /cart/:id  should delete an product added to cart by id', async () => {
  const res = await request(app)
    .delete(`/cart/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});