const express = require('express');
const accountRoutes = require('./accout.route'); 
const dashboardRoutes = require('./dashboard.route'); 
const router = express.Router();

router.use('/account', accountRoutes);

router.use('/dashboard', dashboardRoutes);

module.exports = router;