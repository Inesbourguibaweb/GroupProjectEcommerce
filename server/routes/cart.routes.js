const ShoppingCartController = require('../controllers/cart.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.post("/api/addCart", authenticate, ShoppingCartController.addItemToCart)
    app.delete("/api/deleteCart", authenticate, ShoppingCartController.removeItemFromCart)
}
