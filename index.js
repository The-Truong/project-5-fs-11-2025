const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()
const homeController = require('./controllers/client/home.controller');
const tourController = require('./controllers/client/tour.controller');

const app = express();
const port = 3000;

mongoose.connect(process.env.DATABASE);



// chỉ định thư mục chứa file giao diện
app.set('views', path.join(__dirname, 'views'));

// cấu hình view engine
app.set('view engine', 'pug');

// cấu hình thư mục file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', homeController.home);

app.get('/tour', tourController.list);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});