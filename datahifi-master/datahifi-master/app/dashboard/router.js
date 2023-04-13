const express = require('express');
const { ensureAuthenticatedAdmin } = require('./auth');
const { viewDashboard, viewEdit, actionEdit, deleteDashboard } = require('./controller');
const router = express.Router();

router.get('/', ensureAuthenticatedAdmin, viewDashboard);
router.get('/edit/:id', ensureAuthenticatedAdmin, viewEdit);
router.put('/edit/:id', ensureAuthenticatedAdmin, actionEdit);
router.delete('/delete/:id', ensureAuthenticatedAdmin, deleteDashboard);

module.exports = router;
