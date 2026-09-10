const express = require('express');
const tourController = require('../../controllers/admin/tour.controller');
const tourValidate = require('../../validates/admin/tour.validate');
const multer  = require('multer')
const { storage } = require('../../helpers/cloudinary.helper');

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/list', tourController.list);

router.get('/create', tourController.create);

router.post(
    '/create',
    upload.single("avatar"),
    tourValidate.createPost,
    tourController.createPost
  );

router.get('/trash', tourController.trash);

router.get('/edit/:id', tourController.edit);

router.patch('/edit/:id',
    upload.single("avatar"),
    tourValidate.createPost,
    tourController.editPatch);

module.exports = router;