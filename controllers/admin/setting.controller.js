const SettingWebsiteInfo = require("../../models/setting-website-info.model");

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

module.exports.accountAdminList = (req, res) => {
  res.render('admin/pages/setting-account-admin-list', {
    pageTitle: 'Tài khoản quản trị',
  });
}

module.exports.accountAdminCreate = (req, res) => {
  res.render('admin/pages/setting-account-admin-create', {
    pageTitle: 'Tạo tài khoản quản trị',
  });
}

module.exports.roleList = (req, res) => {
  res.render('admin/pages/setting-role-list', {
    pageTitle: 'Nhóm quyền',
  });
}

module.exports.roleCreate = (req, res) => {
  res.render('admin/pages/setting-role-create', {
    pageTitle: 'Tạo nhóm quyền',
  });
}