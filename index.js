const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()
const clientRoutes = require('./routes/client/index.route');

const app = express();
const port = 3000;

mongoose.connect(process.env.DATABASE);

// chỉ định thư mục chứa file giao diện
app.set('views', path.join(__dirname, 'views'));

// cấu hình view engine
app.set('view engine', 'pug');

// cấu hình thư mục file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

//cấu hình đường dẫn
app.use('/', clientRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});