const { createUser, loginService, isUserAthenticatedService } = require('../services/userServices');

const signUpController = async (req, res, next) => {
    const user = await createUser(req.body);
    res.status(200).json({
        user
    });
};

const loginController = async (req, res, next) => {
    const token = await loginService(req.body);
    return res.status(200).json({ token });
};

const isUserAthenticated = async (req, res, next) => {
    req.user = await isUserAthenticatedService(req.headers['authorization']);
    next();
};

module.exports = {
    signUpController,
    loginController,
    isUserAthenticated
}