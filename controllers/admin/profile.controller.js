const AccountAdmin = require('../../models/account-admin.model');
const jwt = require('jsonwebtoken');

module.exports.edit = (req, res) => {
  res.render('admin/pages/profile-edit', {
    pageTitle: 'Thông tin cá nhân',
  });
}

module.exports.editPatch = async (req, res) => {
  try {
    const id = res.locals.account.id;
    const accountDetail = await AccountAdmin.findById(id);

    if(!accountDetail) {
      res.json({
        code: "error",
        message: "Tài khoản quản trị không tồn tại!",
      })
      return;
    }

    const existEmail = await AccountAdmin.findOne({
      email: req.body.email,
      _id: { $ne: id} //loại trừ tài khoản này
    })

    if(existEmail) {
      res.json({
        code: "error",
        message: "Email đã tồn tại trong hệ thống!",
      });
      return;
    }

    const existPhone = await AccountAdmin.findOne({
      phone: req.body.phone,
      _id: { $ne: id},
    })

    if(existPhone) {
      res.json({
        code: "error",
        message: "Số điện thoại đã tồn tại trong hệ thống!",
      })
      return;
    }

    req.body.avatar = req.file ? req.file.path : "";
    req.body.updatedBy = res.locals.account.id;

    await AccountAdmin.updateOne({
      _id: id
    }, req.body);

    const token = jwt.sign(
      {
        id: id,
        email: req.body.email,
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
      message: "Đã cập nhật tài khoản",
    })

  } catch (error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ",
    })
  }
}

module.exports.changePassword = (req, res) => {
  res.render('admin/pages/profile-change-password', {
    pageTitle: 'Đổi mật khẩu',
  });
}