const express = require('express');
const { signupValidation, loginValidation } = require('../Middlewares/shreyVal');
const { signup, login } = require('../Controllers/Authcontrol');
const router = express.Router();



router.post("/login",loginValidation,login)
router.post("/signup",signupValidation, signup)

module.exports = router;