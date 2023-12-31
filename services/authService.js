const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken');
const { SECRET } = require('../constants');


exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (email, firstName, lastName, password, repeatPassword) => {

    //! validate password
    if (password.length <= 5) {
        throw new Error('Password too short');
    }

    if (repeatPassword !== password) {
        throw new Error('Password don`t match!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, firstName, lastName, password: hashedPassword });

    // auto login after register
    return this.login(email, password);
};


exports.login = async (email, password) => {

    // user exist
    const user = await this.findByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    // password is valid
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    // generate token
    const payload = {
        _id: user._id,
        email,
    };

    const token = await jwt.sign(payload, SECRET);
    return token;
}

