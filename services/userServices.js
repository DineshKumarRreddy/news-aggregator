const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { users } = require('../users.json');

const generateToken = (user) => {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRATION_TIME || '90d' });
};

const createUser = async (userPayload) => {
    const { name, email, password, preferences } = userPayload;
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userId = uuidv4();
    const user = {
        id: userId,
        name, email, password: hashedPassword, preferences
    };
    users.push(user);
};

const loginService = async (authenticateUser) => {
    const { email, password } = authenticateUser;
    const user = users.find(user => user.email === email);
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            //generates jwt
            const token = generateToken(user);
            return token;
        }
        throw ({ statusCode: 401, message: 'user email or password incorrect' });
    }
    throw ({ statusCode: 404, message: 'user not found' });
};

const isUserAthenticatedService = async (token) => {
    let authToken, anthUser;
    if (token && token.startsWith('Bearer')) {
        authToken = token.split(' ')[1];
    }
    if (!authToken) throw ({ statusCode: 401, message: 'Access denied, please login' });
    jwt.verify(authToken, process.env.JWT_SECRET || 'default_secret',
        (err, user) => {
            if (err) throw ({ statusCode: 403, message: 'Invalid token' });
            const isUserPresent = users.find(user => user.id === user.id);
            if (!isUserPresent) throw ({ statusCode: 404, message: 'user does not exist' });
            anthUser = user;
        });
    return anthUser;
}

module.exports = {
    createUser,
    loginService,
    isUserAthenticatedService
}