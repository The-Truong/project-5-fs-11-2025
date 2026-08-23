const AccountAdmin = require('../../models/account-admin.model');
const ForgotPassword = require('../../models/forgot-password.model')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { randomNumber } = require('../../helpers/generate.helper');
const { sendMail } = require('../../helpers/mail.helper');

module.exports.login = (req, res) => {
  res.render('admin/pages/login', {
    pageTitle: 'Đăng nhập',
  });
}

module.exports.loginPost = async (req, res) => {
  const { email, password, rememberPassword } = req.body;
  
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
      email: existAccount.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: rememberPassword ? '7d' : '1d',
    }
  );
  
  res.cookie('token', token, {
    maxAge: rememberPassword ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
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

module.exports.forgotPasswordPost = async (req, res) => {
  const { email } = req.body;
  //kiểm tra email đã từng được đăng ký chưa
  const existEmailMain = await AccountAdmin.findOne({
    email: email,
  })

  if(!existEmailMain){
    res.json({
      code: "error",
      message: "Email này chưa được đăng ký!"
    })
    return;
  }
  //kiểm tra email có tồn tại trong forgotpassword không
  const exitEmail = await ForgotPassword.findOne({
    email: email,
  })

  if(exitEmail){
    res.json({
      code: "error",
      message: "Vui lòng gửi lại yêu cầu sau 5 phút!"
    });
    return;
  }
  //tạo mã otp
  const otp = randomNumber(4);

  //lưu vào bộ sưu tập forgotpassword: email và otp, sau 5 phút tự xóa bản ghi
  const newRecord = new ForgotPassword({
    email: email,
    otp: otp,
    expireAt: Date.now() + 5 * 60 * 1000,
  })

  await newRecord.save();
  //gửi email tự động cho khách hàng
  // tnxq jkxu ofhk fht
  const subject = `Mã OTP lấy lại mật khẩu trang quản lý`;
  const content = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mã OTP lấy lại mật khẩu</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f4f6f9;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 500px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .email-header {
          background-color: #10b981;
          color: #ffffff;
          text-align: center;
          padding: 24px 20px;
        }
        .email-header h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
        .email-body {
          padding: 32px 24px;
          color: #334155;
          line-height: 1.6;
        }
        .otp-box {
          background-color: #ecfdf5;
          border: 2px dashed #10b981;
          border-radius: 8px;
          text-align: center;
          padding: 16px;
          margin: 24px 0;
        }
        .otp-code {
          font-size: 32px;
          font-weight: bold;
          color: #059669;
          letter-spacing: 6px;
        }
        .warning-text {
          font-size: 13px;
          color: #ef4444;
          background-color: #fef2f2;
          padding: 10px 12px;
          border-radius: 6px;
          margin-top: 16px;
        }
        .email-footer {
          background-color: #f8fafc;
          text-align: center;
          padding: 16px;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Yêu cầu lấy lại mật khẩu</h1>
        </div>
        <div class="email-body">
          <p>Xin chào,</p>
          <p>Chúng tôi đã nhận được yêu cầu lấy lại mật khẩu cho tài khoản trang quản lý của bạn. Vui lòng sử dụng mã OTP dưới đây để hoàn tất quá trình:</p>
          
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
          </div>

          <p style="margin-bottom: 8px;">⏰ Mã OTP này có hiệu lực trong <strong>5 phút</strong>.</p>
          
          <div class="warning-text">
            ⚠️ <strong>Lưu ý bảo mật:</strong> Vui lòng tuyệt đối không chia sẻ mã này với bất kỳ ai để bảo vệ tài khoản của bạn.
          </div>
        </div>
        <div class="email-footer">
          <p>Nếu bạn không gửi yêu cầu này, vui lòng bỏ qua email hoặc liên hệ với Quản trị viên.</p>
          <p>&copy; Trang Quản Lý. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  sendMail(email, subject, content);

  res.json({
    code: "success",
    message: "Gửi mã OTP thành công"
  })
}

module.exports.otpPassword = async (req, res) => {
  const { email } = req.query;
  
  res.render('admin/pages/otp-password', {
    pageTitle: 'Nhập mã OTP',
    email: email,
  });
}

module.exports.otpPasswordPost = async (req, res) => {
  const { otp, email } = req.body;
  
  const existRecord = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })

  if(!existRecord){
    res.json({
      code: "error",
      message: "Mã OTP không chính xác!"
    })
    return;
  }

  const existAccount = await AccountAdmin.findOne({
    email: email,
  })

  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email,
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
    message: "Xác thực thành công!",
  });
  
}

module.exports.resetPassword = (req, res) => {
  res.render('admin/pages/reset-password', {
    pageTitle: 'Đổi mật khẩu',
  });
}

module.exports.resetPasswordPost = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.cookies;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;
        
    const existAccount = await AccountAdmin.findOne({
      _id: id,
      email: email,
      status: "active"
    })

    if(!existAccount){
      res.clearCookies("token");
      res.json({
        code: "error",
        message: "Không tìm thấy tài khoản!",
      })
      return;
    }

    const salt = bcrypt.genSaltSync(10); // tạo chuỗi ngẫu nhiên 10 ký tự
    const hashPassword = bcrypt.hashSync(password, salt);

    existAccount.password = hashPassword;
    await existAccount.save();

    res.json({
      code: "success",
      message: "Đổi mật khẩu thành công",
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`/${pathAdmin}/account/login`);
}