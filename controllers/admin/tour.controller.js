const { buildCategoryTree } = require('../../helpers/category.helper');
const Category = require('../../models/category.model');
const City = require('../../models/city.model');
const Tour = require('../../models/tour.model');

module.exports.list = (req, res) => {
  res.render('admin/pages/tour-list', {
    pageTitle: 'Quản lý tour',
  });
}

module.exports.create = async (req, res) => {
  const categoryList = await Category.find({
    deleted: false,
  });
  const categoryTree = buildCategoryTree(categoryList,"");

  const cityList = await City.find({});

  res.render('admin/pages/tour-create', {
    pageTitle: 'Tạo tour',
    categoryList: categoryTree,
    cityList: cityList,
  });
}

module.exports.createPost = async (req, res) => {
  try {
    if(req.body.position){
      req.body.position = parseInt(req.body.position);
    }else {
      const recordPossitionMax = await Tour
      .findOne({})
      .sort({
        position: 'desc',
      });

      if(recordPossitionMax){
        req.body.position = recordPossitionMax.position + 1;
      }else req.body.position = 1;
    }

    req.body.priceAdult = req.body.priceAdult ? parseInt(req.body.priceAdult) : 0;
    req.body.priceChildrent = req.body.priceChildrent ? parseInt(req.body.priceChildrent) : 0;
    req.body.priceBaby = req.body.priceBaby ? parseInt(req.body.priceBaby) : 0;
    req.body.priceNewAdult = req.body.priceNewAdult ? parseInt(req.body.priceNewAdult) : req.body.priceAdult;
    req.body.priceNewChildrent = req.body.priceNewChildrent ? parseInt(req.body.priceNewChildrent) : req.body.priceChildrent;
    req.body.priceNewBaby = req.body.priceNewBaby ? parseInt(req.body.priceNewBaby) : req.body.priceBaby;
    req.body.stockAdult = req.body.stockAdult ? parseInt(req.body.stockAdult) : 0;
    req.body.stockChildrent = req.body.stockChildrent ? parseInt(req.body.stockChildrent) : 0;
    req.body.stockBaby = req.body.stockBaby ? parseInt(req.body.stockBaby) : 0;
    req.body.locations = req.body.locations ? JSON.parse(req.body.locations) : [];
    req.body.departureDate = req.body.departureDate ? new Date(req.body.departureDate) : null;
    req.body.schedules = req.body.schedules ? JSON.parse(req.body.schedules) : [];
    req.body.avatar = req.file ? req.file.path : '';
    req.body.createdBy = res.locals.account.id;

    const newRecord = new Tour(req.body);
    await newRecord.save();

    res.json({
      code: "success",
      message: "Tạo tour thành công!"
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.trash = (req, res) => {
  res.render('admin/pages/tour-trash', {
    pageTitle: 'Thùng rác tour',
  });
}