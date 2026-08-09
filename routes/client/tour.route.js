const express = require('express');
const tourController = require('../../controllers/client/tour.controller');

const router = express.Router();

router.get('/', tourController.list);

module.exports = router;