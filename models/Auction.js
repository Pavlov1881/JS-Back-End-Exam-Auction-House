const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 4,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
        maxLength: [200, 'Description should be at maximum 200 characters long!'],
        required: [true, 'Description is required!'],
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        enum: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: 'The Crypto Image URL must start with http:// or https://',
        }
    },
    price: {
        type: Number,
        min: [0, 'Price should be a positive number'],
        required: [true, 'Price is required!'],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bidder: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],

});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;