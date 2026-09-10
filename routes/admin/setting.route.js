const express = require('express');
const settingController = require('../../controllers/admin/setting.controller');
const multer  = require('multer')
const { storage } = require('../../helpers/cloudinary.helper');

const upload = multer({ storage: storage });
const router = express.Router();

router.get('/list', settingController.list);

router.get('/website-info', settingController.websiteInfo);

const uploadMiddleware = upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 }
  ])
router.patch('/website-info',
  uploadMiddleware,
  settingController.websiteInfoPatch);

router.get('/account-admin/list', settingController.accountAdminList);

router.get('/account-admin/create', settingController.accountAdminCreate);

router.get('/role/list', settingController.roleList);

router.get('/role/create', settingController.roleCreate);

module.exports = router;