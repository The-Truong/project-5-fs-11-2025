const express = require('express');
const orderController = require('../../controllers/admin/order.controller');

const router = express.Router();

router.get('/list', orderController.list);

router.get('/edit', orderController.edit);

module.exports = router;