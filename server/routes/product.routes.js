const ProductController = require("../controllers/product.controller");
const { authenticate, isLoggedIn } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/products",authenticate,ProductController.getAllProduct); 
    app.post("/api/products",authenticate,ProductController.createProduct);
    app.get("/api/products/:id",authenticate,ProductController.findOneSingleProduct)
    app.delete("/api/products/:id",authenticate,ProductController.deleteProduct) 
    app.put("/api/products/:id",authenticate,ProductController.updateOneProduct)
    app.put("/api/products/:id/favorite",authenticate,ProductController.updateOneProductLike)
    app.put("/api/products/:id/unfavorite",authenticate,ProductController.updateOneProductUnlike)
}