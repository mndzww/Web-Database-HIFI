const express = require('express');
const { hasLogin } = require('../middleware/auth');
const router = express.Router();
const { viewLogIn, viewSignUp, actionSignUp, actionLogIn, actionLogOut } = require('./controller');

/* GET home page. */
router.get('/login', hasLogin, viewLogIn);
router.get('/signup', hasLogin, viewSignUp);
router.get('/logout', actionLogOut);
router.post('/login', actionLogIn);
router.post('/signup', actionSignUp);

module.exports = router;
