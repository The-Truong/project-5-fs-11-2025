const express = require('express');
const tourController = require('../../controllers/admin/tour.controller');

const router = express.Router();

router.get('/list', tourController.list);

router.get('/create', tourController.create);

router.get('/trash', tourController.trash);

module.exports = router;