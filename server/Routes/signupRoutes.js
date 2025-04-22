const express = require('express');
const { registerUser, loginUser } = require('../Controllers/signupCtrl');

const signupRouter = express.Router();
signupRouter.post('/',registerUser);
signupRouter.post('/login',loginUser);
module.exports = signupRouter;