const express = require('express');
const userRouter = require('./userRouter');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter);
router.use('/categories', userRouter);


module.exports = router;