const express = require('express');
const categoryController = require('../../controllers/admin/category.controller');
const multer  = require('multer')
const upload = multer({})

const router = express.Router();

router.get('/list', categoryController.list);

router.get('/create', categoryController.create);

router.post('/create', upload.none(), categoryController.createPost);

module.exports = router;