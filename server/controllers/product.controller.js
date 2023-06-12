const Product=require('../models/product.model');
const jwt = require("jsonwebtoken");

//Read AllProducts
module.exports.getAllProduct = (request, response) => {
    Product.find({})
        .then(Products => {
            console.log(Products); 
            response.json(Products);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

// Get One Product
module.exports.findOneSingleProduct = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(Product => res.json(Product))
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong', error: err })
        });
    }

//Create a new Product
module.exports.createProduct = (request, response) => { 
    console.log(request.Token.firstName);  
    Product.create({...request.body, 
        addedBy:request.Token.firstName, 
        likedBy:request.Token.firstName })        
        .then(Product => response.json(Product))
        .catch(err => response.status(400).json(err))
    }

//Update One Product 
module.exports.updateOneProduct = (req,res)=>{
    Product.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true })
    .then(updatedProduct=>{
        console.log("UPDATED ✅✅");
        res.json(updatedProduct)
    })
    .catch(err=>{
        console.log("FAILED TO UPDATE ❌❌❌");
        res.json(err)
    })
}
//To add like 
module.exports.updateOneProductLike = (req, res) => {
    Product.findByIdAndUpdate(
      req.params.id,
      { $push: { likedBy: req.Token.firstName} },
      { new: true, runValidators: true }
    )
      .then((updatedProduct) => {
        console.log("UPDATED ✅✅");
        res.json(updatedProduct);
      })
      .catch((err) => {
        console.log("FAILED TO UPDATE ❌❌❌");
        res.json(err);
      });
  };

// to remove a like 
module.exports.updateOneProductUnlike = (req, res) => {
    const ProductId = req.params.id;
    const userFirstName = req.Token.firstName; 
    // Find the Product by ID
    Product.findById(ProductId)
      .then((Product) => {
        if (!Product) {
          return res.status(404).json({ error: 'Product not found' });
        }
  
        // Remove the user from the Product's likedBy array
        const updatedLikedBy = Product.likedBy.filter((user) => user !== userFirstName);
        Product.likedBy = updatedLikedBy;
  
        // Save the updated Product
        return Product.save();
      })
      .then((updatedProduct) => {
        res.json(updatedProduct);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while unfollowing the Product' });
      });
  };
  
//Delete One Product 
module.exports.deleteProduct = (request, response) => {
    Product.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => 
            {console.log(_id);
            response.json(deleteConfirmation);
        }
            )
        .catch(err => response.json(err))
}







