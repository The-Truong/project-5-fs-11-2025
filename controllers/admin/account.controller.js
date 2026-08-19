const AccountAdmin = require('../../models/account-admin.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
  res.render('admin/pages/login', {
    pageTitle: 'Đăng nhập',
  });
}

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  
  const existAccount = await AccountAdmin.findOne({
    email: email,
  })

  if(!existAccount){
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!",
    })
    return;
  }
  
  const isMatchPassword = await bcrypt.compareSync(password, existAccount.password);  
  if(!isMatchPassword){
    res.json({
      code: "error",
      message: "Sai mật khẩu!",
    })
    return;
  }

  if(existAccount.status != "active") {
    res.json({
      code: "error",
      message: "Tài khoản chưa được kích hoạt!",
    })
    return;
  }

  const token = jwt.sign(
    {
      id: existAccount.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
  
  res.cookie('token', token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, //chỉ cho phép gửi bên server
    sameSite: 'strict',
  });

  res.json({
    code: "success",
    message: "Đăng nhập thành công!",
  });
}

module.exports.register = (req, res) => {
  res.render('admin/pages/register', {
    pageTitle: 'Đăng ký',
  });
}

module.exports.registerPost = async (req, res) => {
  req.body.status = 'initial';

  const existAccount = await AccountAdmin.findOne({
    email: req.body.email,
  });

  if(existAccount){
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!",
    })
    return;
  }

  const salt = bcrypt.genSaltSync(10); // tạo chuỗi ngẫu nhiên 10 ký tự
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  const newRecord = new AccountAdmin(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Đăng ký thành công",
  })
}

module.exports.registerSuccess = (req, res) => {
  res.render('admin/pages/register-success', {
    pageTitle: 'Tài khoản đã được khởi tạo',
  });
}

module.exports.forgotPassword = (req, res) => {
  res.render('admin/pages/forgot-password', {
    pageTitle: 'Quên mật khẩu',
  });
}

module.exports.otpPassword = (req, res) => {
  res.render('admin/pages/otp-password', {
    pageTitle: 'Nhập mã OTP',
  });
}

module.exports.resetPassword = (req, res) => {
  res.render('admin/pages/reset-password', {
    pageTitle: 'Đổi mật khẩu',
  });
}

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`/${pathAdmin}/account/login`);
}