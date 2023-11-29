const Category = require("./Category");
const Product = require("./Product");
const Image = require("./Image");
const Purchase = require("./Purchase");
const User = require("./User");
const Cart = require("./Cart");


Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);