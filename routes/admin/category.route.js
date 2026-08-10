const express = require('express');
const categoryController = require('../../controllers/admin/category.controller');

const router = express.Router();

router.get('/list', categoryController.list);

router.get('/create', categoryController.create);

module.exports = router;