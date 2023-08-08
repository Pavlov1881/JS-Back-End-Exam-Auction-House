const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        minLength: [10, 'Email must be at least 10 characters long'],
        required: [true, 'Email is required'],
        validate: {
            validator: (value) => /^[a-z]+@[a-z]+\.[a-z]+$/.test(value),
            message: 'The email should be in the following format: <name>@<domain>.<extension> and only English letters!',
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    firstName: {
        type: String,
        minLength: [1, 'First name must be at least 1 character long'],
        required: [true, 'Username is required']
    },
    lastName: {
        type: String,
        minLength: [1, 'Last name must be at least 1 character long'],
        required: [true, 'Username is required']
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;