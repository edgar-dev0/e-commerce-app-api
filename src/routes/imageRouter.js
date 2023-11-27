const { getAll, create, getOne, remove, update } = require('../controllers/image.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

imageRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(update);

module.exports = imageRouter;