const express = require('express');
const router = express.Router();
const { index, viewProfile, viewForgot, actionForgot, actionProfile } = require('./controller');
const { ensureAuthenticated, hasLogin } = require('../middleware/auth');

router.get('/', index);
router.get('/profile', ensureAuthenticated, viewProfile);
router.get('/forgot', hasLogin, viewForgot);
router.post('/profile', actionProfile);
router.post('/forgot', actionForgot);

module.exports = router;
