const express = require('express');
const userController = require('../../controllers/admin/user.controller');

const router = express.Router();

router.get('/list', userController.list);

module.exports = router;