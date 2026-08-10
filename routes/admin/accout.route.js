const express = require('express');
const accountController = require('../../controllers/admin/account.controller');

const router = express.Router();

router.get('/login', accountController.login);

module.exports = router;