const express = require('express');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const imageRouter = require('./imageRouter');
const cartRouter = require('./cartRouter');
const purchaseRouter = require('./purchaseRouter');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/product_images', imageRouter);
router.use('/cart', cartRouter);
router.use("/purchases", purchaseRouter);


module.exports = router;