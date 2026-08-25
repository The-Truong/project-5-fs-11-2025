const Category = require("../../models/category.model");

module.exports.list = (req, res) => {
  res.render('admin/pages/category-list', {
    pageTitle: 'Quản lý danh mục',
  });
}

module.exports.create = (req, res) => {
  res.render('admin/pages/category-create', {
    pageTitle: 'Tạo danh mục',
  });
}

module.exports.createPost = async (req, res) => {
  try {
    if(req.body.position){
      req.body.position = parseInt(req.body.position);
    }else {
      const recordPossitionMax = await Category
      .findOne({})
      .sort({
        position: 'desc',
      });

      if(recordPossitionMax){
        req.body.position = recordPossitionMax.position + 1;
      }else req.body.position = 1;
    }
    
    req.body.avatar = req.file ? req.file.path : '';

    req.body.createdBy = res.locals.account.id;

    const newRecord = new Category(req.body);
    await newRecord.save();

    res.json({
      code: "success",
      message: "Tạo danh mục thành công!"
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}