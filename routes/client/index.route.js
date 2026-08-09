const express = require('express');
const homeRoutes = require('./home.route');
const tourRoutes = require('./tour.route');
const router = express.Router();

router.get('/', homeRoutes);

router.use('/tour', tourRoutes);

module.exports = router;