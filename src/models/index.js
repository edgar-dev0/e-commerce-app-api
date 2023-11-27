const Category = require("./Category");
const Product = require("./Product");
const Image = require("./Image");


Product.belongsTo(Category);
Category.hasOne(Product);

Image.belongsTo(Product);
Product.hasOne(Image);