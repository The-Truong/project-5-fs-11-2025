const express = require('express');
const contactController = require('../../controllers/admin/contact.controller');

const router = express.Router();

router.get('/list', contactController.list);

module.exports = router;