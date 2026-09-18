const express = require('express');
const profileController = require('../../controllers/admin/profile.controller');
const multer  = require('multer')
const { storage } = require('../../helpers/cloudinary.helper');

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/edit', profileController.edit);

router.patch('/edit',
    upload.single("avatar"),
    profileController.editPatch);

router.get('/change-password', profileController.changePassword);


module.exports = router;