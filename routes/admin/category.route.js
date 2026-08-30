const express = require('express');
const categoryController = require('../../controllers/admin/category.controller');
const categoryValidate = require('../../validates/admin/category.validate');
const multer  = require('multer')
const { storage } = require('../../helpers/cloudinary.helper');

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/list', categoryController.list);

router.get('/create', categoryController.create);

router.post('/create',
    upload.single("avatar"),
    categoryValidate.createPost,
    categoryController.createPost);
// : để tạo ra đường dẫn động
router.get('/edit/:id', categoryController.edit);

router.patch('/edit/:id',
    upload.single("avatar"),
    categoryValidate.createPost,
    categoryController.editPatch);

module.exports = router;