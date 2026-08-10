const express = require('express');
const accountRoutes = require('./accout.route');
const router = express.Router();

router.use('/account', accountRoutes);

module.exports = router;