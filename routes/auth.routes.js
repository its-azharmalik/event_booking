const express = require('express');

const { signup, login, logout } = require('../controllers/auth.controller');
const { authentication, tokenVerification } = require('../config');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', authentication, login);
router.get('/logout', tokenVerification, logout);

module.exports = router;