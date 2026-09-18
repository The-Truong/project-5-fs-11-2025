const SettingWebsiteInfo = require("../../models/setting-website-info.model");
const AccountAdmin = require("../../models/account-admin.model");
const Role = require("../../models/role.model");
const { permissionList } = require("../../configs/variable.config");
const slugify = require('slugify');
const bcrypt = require("bcryptjs");

module.exports.list = (req, res) => {
  res.render('admin/pages/setting-list', {
    pageTitle: 'Cài đặt chung',
  });
}

module.exports.websiteInfo = async (req, res) => {
  const settingWebsiteInfo = await SettingWebsiteInfo.findOne({});

  res.render('admin/pages/setting-website-info', {
    pageTitle: 'Thông tin website',
    settingWebsiteInfo: settingWebsiteInfo,
  });
}

module.exports.websiteInfoPatch = async (req, res) => {
  req.body.logo = req.files.logo ? req.files.logo[0].path : '';
  req.body.favicon = req.files.favicon ? req.files.favicon[0].path : '';
  
  await SettingWebsiteInfo.findOneAndUpdate({}, req.body, {
    upsert: true //nếu không tìm thấy bản ghi nào thì sẽ tạo bản ghi mới
  });

  res.json({
    code: "success",
    message: "Đã cập nhật!",
  })
}

module.exports.accountAdminList = async (req, res) => {
  const find = {
    deleted: false,
  }

  const recordList = await AccountAdmin
  .find(find)
  .sort({
    createdAt: "desc",
  });

  for(const item of recordList) {
    const role = await Role.findById(item.role);

    item.roleName = role?.name;
  }

  res.render('admin/pages/setting-account-admin-list', {
    pageTitle: 'Tài khoản quản trị',
    recordList: recordList,
  });
}

module.exports.accountAdminCreate = async (req, res) => {
  const roleList = await Role.find({
    deleted: false,
  })

  res.render('admin/pages/setting-account-admin-create', {
    pageTitle: 'Tạo tài khoản quản trị',
    roleList: roleList,
  });
}

module.exports.accountAdminCreatePost = async (req, res) => {
  try {
    const existEmail = await AccountAdmin.findOne({
      email: req.body.email,
    });

    if(existEmail) {
      res.json({
        code: "error",
        message: "Email đã tồn tại trong hệ thống!",
      })
      return;
    }

    const existPhone = await AccountAdmin.findOne({
      phone: req.body.phone,
    });

    if(existPhone) {
      res.json({
        code: "error",
        message: "Số điện thoại đã được đăng ký!",
      })
      return;
    }

    const salt = bcrypt.genSaltSync(10); // tạo chuỗi ngẫu nhiên 10 ký tự
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    
    req.body.avatar = req.file ? req.file.path : '';

    req.body.createdBy = res.locals.account.id;

    const newRecord = new AccountAdmin(req.body);
    await newRecord.save();

    res.json({
      code: "success",
      message: "Tạo tài khoản thành công",
    })
  } catch (error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.accountAdminEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const accountDetail = await AccountAdmin.findOne({
      _id: id,
    })

    if(!accountDetail){
      res.direct(`/${pathAdmin}/setting/account-admin/list`);
      return;
    }
    
    const roleList = await Role.find({
      deleted: false,
    })

    res.render('admin/pages/setting-account-admin-edit', {
      pageTitle: 'Chỉnh sửa tài khoản quản trị',
      roleList: roleList,
      accountDetail: accountDetail,
    });
  }catch (error) {
    console.log("Lỗi: " + error);
    if(!accountDetail){
      res.direct(`/${pathAdmin}/setting/account-admin/list`);
      return;
    }
  }
}

module.exports.accountAdminEditPatch = async (req, res) => {
  try {
    const id = req.params.id;

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

    res.json({
      code: "success",
      message: "Đã chỉnh sửa tài khoản quản trị",
    })

  } catch (error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.accountAdminChangePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const accountDetail = await AccountAdmin.findOne({
      _id: id,
    })

    if(!accountDetail){
      res.direct(`/${pathAdmin}/setting/account-admin/list`);
      return;
    }
    
    res.render('admin/pages/setting-account-admin-change-password', {
      pageTitle: 'Đổi mật khẩu tài khoản quản trị',
      accountDetail: accountDetail,
    });

  }catch (error) {
    console.log("Lỗi: " + error);
    res.direct(`/${pathAdmin}/setting/account-admin/list`);
  }
}

module.exports.accountAdminChangePasswordPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const accountDetail = await AccountAdmin.findOne({
      _id: id,
    })

    if(!accountDetail){
      res.json({
        code: "error",
        message: "Tài khoản quản trị không tồn tại!",
      })
      return;
    }

    const salt = bcrypt.genSaltSync(10); // tạo chuỗi ngẫu nhiên 10 ký tự
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    
    req.body.updatedBy = res.locals.account.id;

    await AccountAdmin.updateOne({
      _id: id,
    }, req.body);

    res.json({
      code: "success",
      message: "Đã đổi mật khẩu",
    })

  }catch (error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.roleList = async (req, res) => {
  const find = {
    deleted: false,
  }

  //tìm kiếm
  if(req.query.keyword) {
    const slug = slugify(req.query.keyword, {
      lower: true,
    });
    const regex = new RegExp(slug, "i");
    find.slug = regex;
  }
  //hết tìm kiếm

  //phân trang
  const limitItem = 2;
  let page = 1;
  if(req.query.page && parseInt(req.query.page) > 0){
    page = parseInt(req.query.page);
  }
  
  const skip = (page - 1) * limitItem;
  const totalRecord = await Role.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItem);

  const pagination = {
    skip,
    totalRecord,
    totalPage,
  }
  
  const roleList = await Role
  .find(find)
  .limit(limitItem)
  .skip(skip)
  .sort({
    createdAt: "desc",
  });

  res.render('admin/pages/setting-role-list', {
    pageTitle: 'Nhóm quyền',
    roleList: roleList,
    pagination: pagination,
  });
}

module.exports.roleCreate = (req, res) => {
  res.render('admin/pages/setting-role-create', {
    pageTitle: 'Tạo nhóm quyền',
    permissionList: permissionList,
  });
}

module.exports.roleCreatePost = async (req, res) => {
  try {
    req.body.createdBy = res.locals.account.id;

    const newRecord = new Role(req.body);
    await newRecord.save();

    res.json({
      code: "success",
      message: "đã tạo nhóm quyền",
    })
  }catch(error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    });
  }
}

module.exports.roleEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const roleDetail = await Role.findById(id);

    if(!roleDetail) {
      res.redirect(`/${pathAdmin}/setting/role/list`);
      return;
    }
    
    res.render('admin/pages/setting-role-edit', {
      pageTitle: 'Chỉnh sửa nhóm quyền',
      permissionList: permissionList,
      roleDetail: roleDetail,
    });

  }catch (error) {
    console.log("Lỗi: " + error);
    res.redirect(`/${pathAdmin}/setting/role/list`);
  }
}

module.exports.roleEditPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const roleDetail = await Role.findById(id);

    if(!roleDetail) {
      res.json({
        code: "error",
        message: "Nhóm quyền không tồn tại!"
      })
      return;
    }
    
    req.body.updatedBy = res.locals.account.id;

    await Role.updateOne({
      _id: id,
    }, req.body);

    res.json({
      code: "success",
      message: "Cập nhật thành công",
    })

  }catch (error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.roleDeletePatch = async (req, res) => {
  try {
    const id = req.params.id;
    const roleDetail = await Role.findById(id);

    if(!roleDetail) {
      res.json({
        code: "error",
        message: "Nhóm quyền không tồn tại!"
      })
      return;
    }

    await Role.updateOne({
      _id: id,
    }, {
      deleted: true,
      deletedAt: Date.now(),
      deletedBy: res.locals.account.id,
    });

    res.json({
      code: "success",
      message: "Xóa thành công",
    })

  }catch (error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.roleChangeMultiPatch = async (req, res) => {
  try {
    const adminId = res.locals.account.id;
    const { listId, option } = req.body;

    switch (option) {
      case "delete":
        await Role.updateMany({
          _id: {
            $in: listId,
          }
        }, {
          deleted: true,
          deletedAt: Date.now(),
          deletedBy: adminId,
        })
        res.json({
          code: "success",
          message: "Đã xóa!",
        })
        break;
      default:
        res.json({
          code: "error",
          message: "Hành động không hợp lệ",
        })
        break;
    }
  } catch (error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
  
}