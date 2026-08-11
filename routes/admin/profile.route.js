const express = require('express');
const profileController = require('../../controllers/admin/profile.controller');

const router = express.Router();

router.get('/edit', profileController.edit);

router.get('/change-password', profileController.changePassword);


module.exports = router;