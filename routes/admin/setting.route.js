const express = require('express');
const settingController = require('../../controllers/admin/setting.controller');
const settingRoleValidate = require('../../validates/admin/setting-role.validate');
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

router.post('/account-admin/create',
  upload.single('avatar'),
  settingController.accountAdminCreatePost);

router.get('/account-admin/edit/:id', settingController.accountAdminEdit);

router.patch('/account-admin/edit/:id',
  upload.single('avatar'),
  settingController.accountAdminEditPatch);

router.get('/account-admin/change-password/:id', settingController.accountAdminChangePassword);

router.patch('/account-admin/change-password/:id', settingController.accountAdminChangePasswordPatch);

router.get('/role/list', settingController.roleList);

router.get('/role/create', settingController.roleCreate);

router.post('/role/create',
    settingRoleValidate.createPost,
    settingController.roleCreatePost);

router.get('/role/edit/:id', settingController.roleEdit);

router.patch('/role/edit/:id',
    settingRoleValidate.createPost,
    settingController.roleEditPatch);

router.patch('/role/delete/:id', settingController.roleDeletePatch);

router.patch('/role/change-multi', settingController.roleChangeMultiPatch);

module.exports = router;