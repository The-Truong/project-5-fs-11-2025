const express = require('express');
const path = require('path');
require('dotenv').config()
const connectDB = require('./configs/database.config');
const adminRoutes = require('./routes/admin/index.route');
const clientRoutes = require('./routes/client/index.route');
const { pathAdmin } = require('./configs/variable.config');
const app = express();
const port = 3000;

// kết nối database
connectDB();

// chỉ định thư mục chứa file giao diện
app.set('views', path.join(__dirname, 'views'));

// cấu hình view engine
app.set('view engine', 'pug');

// cấu hình thư mục file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// thêm biến toàn cục trong pug
app.locals.pathAdmin = pathAdmin;

// thêm biến toàn cục trong backend
global.pathAdmin = pathAdmin;

// cho phép gửi data lên ở dạng json
app.use(express.json());

//cấu hình đường dẫn
app.use(`/${pathAdmin}`, adminRoutes);
app.use('/', clientRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});