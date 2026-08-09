const express = require('express');
const cartController = require('../../controllers/client/cart.controller');

const router = express.Router();

router.get('/', cartController.cart);

module.exports = router;