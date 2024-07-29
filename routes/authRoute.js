const express = require('express');
const router = express.Router();
const { handleAsyncCatch } = require('../utils/utils');
const { signUpController, loginController } = require('../contorllers/authController');
const { validateSignup, validateLogin } = require('./../utils/validationMiddleWares');

router.post('/signup', validateSignup, handleAsyncCatch(signUpController));
router.post('/login', validateLogin, handleAsyncCatch(loginController));

module.exports = router;