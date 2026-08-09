const express = require('express');
const tourController = require('../../controllers/client/tour.controller');

const router = express.Router();

router.get('/', tourController.list);

router.get('/detail', tourController.detail);

module.exports = router;