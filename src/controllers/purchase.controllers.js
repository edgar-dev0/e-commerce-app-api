const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Image = require('../models/Image');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Purchase.findAll({
        where: { userId: userId },
        include: [{
            model: Product,
            include: [Image]
        }]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    //Obtenemos todos los productos agregados al carrito correspondiente al usuario logeado
    const cart = await Cart.findAll({
        where: { userId: userId },
        attributes: [ 'userId', 'productId', 'quantity'],
        raw: true
    });

    const purchases = await Purchase.bulkCreate(cart);
    //await Purchase.create({ userId, productId, quantity })
    //eliminamos los productos del carro de compras
    await Cart.destroy({ where: { userId: userId }});
    return res.json(purchases);
});

module.exports = {
    getAll,
    create
}