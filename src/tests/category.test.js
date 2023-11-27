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

test('GET /categories should get all categories records', async () => {
  const res = await request(app).get('/categories');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories should create category record', async () => {
  const body = { name: 'Toys' };
  const res = await request(app)
    .post('/categories')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);
});

test('PUT /categories/:id should update an category record by id', async () => {
  const body = {
    name: 'Sports'
  };
  const res = await request(app)
    .put(`/categories/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});

test('DELETE /categories/:id  should delete an category record by id', async () => {
  const res = await request(app)
  .delete(`/categories/${id}`)
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});