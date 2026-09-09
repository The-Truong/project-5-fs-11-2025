const express = require('express');
const tourController = require('../../controllers/admin/tour.controller');
const multer  = require('multer')
const { storage } = require('../../helpers/cloudinary.helper');

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/list', tourController.list);

router.get('/create', tourController.create);

router.post(
    '/create',
    upload.single("avatar"),
    tourController.createPost
  );

router.get('/trash', tourController.trash);

module.exports = router;