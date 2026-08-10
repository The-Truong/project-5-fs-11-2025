const express = require('express');
const orderController = require('../../controllers/admin/order.controller');

const router = express.Router();

router.get('/list', orderController.list);

router.get('/edit', orderController.edit);

// router.get('/trash', orderController.trash);

module.exports = router;