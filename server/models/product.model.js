const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    addedBy: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Title must be at least 3 characters"]
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Title must be at least 3 characters"]
    },
    category:{
        type: String,
        // enum: ["cosmetic", "vehicle", "laptop", "phone", "accessories", "games"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [5, "Description must be at least 5 characters"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
        minLength: [5, "Price must be greater than 1"]
    },
    likedBy: {
        type: Array
    }
}, {timestamps: true});


const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;