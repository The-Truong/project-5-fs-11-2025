const express = require('express');
const categoryController = require('../../controllers/admin/category.controller');
const multer  = require('multer')
const { storage } = require('../../helpers/cloudinary.helper');

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/list', categoryController.list);

router.get('/create', categoryController.create);

router.post('/create',
    upload.single("avatar"),
    categoryController.createPost);

module.exports = router;