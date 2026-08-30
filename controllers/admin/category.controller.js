const Category = require("../../models/category.model");
const AccountAdmin = require("../../models/account-admin.model");
const { buildCategoryTree } = require("../../helpers/category.helper");
const moment = require("moment");

module.exports.list = async (req, res) => {
  const categoryList = await Category
  .find({})
  .sort({
    position: "desc"
  });

  for (const item of categoryList){
    if(item.createdBy){
      const createdBy = await AccountAdmin.findById(item.createdBy);
      item.createdByName = createdBy ? createdBy.fullName : '';
      item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    }

    if(item.updatedBy){
      const updatedBy = await AccountAdmin.findById(item.updatedBy);
      item.updatedByName = updatedBy ? updatedBy.fullName : '';
      item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
    }
  }
  res.render('admin/pages/category-list', {
    pageTitle: 'Quản lý danh mục',
    categoryList: categoryList,
  });
}

module.exports.create = async (req, res) => {
  const categoryList = await Category.find();
  const categoryTree = buildCategoryTree(categoryList,"");

  res.render('admin/pages/category-create', {
    pageTitle: 'Tạo danh mục',
    categoryList: categoryTree,
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