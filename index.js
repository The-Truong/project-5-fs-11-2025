const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// chỉ định thư mục chứa file giao diện
app.set('views', path.join(__dirname, 'views'));

// cấu hình view engine
app.set('view engine', 'pug');

// cấu hình thư mục file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('client/pages/home', {
    pageTitle: 'Trang chủ',
  });
});

app.get('/tour', (req, res) => {
  res.render('client/pages/tour', {
    pageTitle: 'Tour',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});