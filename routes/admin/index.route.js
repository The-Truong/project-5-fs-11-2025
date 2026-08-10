const express = require('express');
const accountRoutes = require('./accout.route'); 
const dashboardRoutes = require('./dashboard.route'); 
const categoryRoutes = require('./category.route'); 
const router = express.Router();

router.use('/account', accountRoutes);

router.use('/dashboard', dashboardRoutes);

router.use('/category', categoryRoutes);

module.exports = router;