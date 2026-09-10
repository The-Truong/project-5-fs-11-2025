const { buildCategoryTree } = require('../../helpers/category.helper');
const Category = require('../../models/category.model');
const City = require('../../models/city.model');
const Tour = require('../../models/tour.model');
const AccountAdmin = require('../../models/account-admin.model');
const moment = require("moment");

module.exports.list = async (req, res) => {
  const find = {
    deleted: false,
  }

  const tourList = await Tour
  .find(find)
  .sort({
    position: 'desc',
  });

  for(const item of tourList) {
    if(item.createdBy) {
      const createdBy = await AccountAdmin.findById(item.createdBy);
      item.createdByName = createdBy ? createdBy.fullName : "";
      item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    }

    if(item.updatedBy){
      const updatedBy = await AccountAdmin.findById(item.updatedBy);
      item.updatedByName = updatedBy ? updatedBy.fullName : "";
      item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
    }
  }

  res.render('admin/pages/tour-list', {
    pageTitle: 'Quản lý tour',
    tourList: tourList,
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

module.exports.trash = async (req, res) => {
  const find = {
    deleted: true,
  }

  const tourList = await Tour
    .find(find)
    .sort({
      deletedAt: 'desc',
    });

    for(const item of tourList) {
      if(item.createdBy) {
        const createdBy = await AccountAdmin.findById(item.createdBy);
        item.createdByName = createdBy ? createdBy.fullName : "";
        item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
      }

      if(item.deletedBy){
        const deletedBy = await AccountAdmin.findById(item.deletedBy);
        item.deletedByName = deletedBy ? deletedBy.fullName : "";
        item.deletedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
      }
    }

  res.render('admin/pages/tour-trash', {
    pageTitle: 'Thùng rác tour',
    tourList: tourList,
  });
}

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const tourDetail = await Tour.findById(id);

    if(!tourDetail) {
      res.redirect(`/${pathAdmin}/tour/list`);
      return;
    }

    const categoryList = await Category.find({
      deleted: false,
    });

    const cityList = await City.find({});
    const categoryTree = buildCategoryTree(categoryList,"");
    tourDetail.departureDateFormat = moment(tourDetail.departureDate).format("YYYY-MM-DD");
    res.render('admin/pages/tour-edit', {
      pageTitle: 'Chỉnh sửa tour',
      categoryList: categoryTree,
      tourDetail: tourDetail,
      cityList: cityList,
    })

  } catch(error) {
    console.log("Lỗi: " + error);
  }
}

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const tourDetail = await Tour.findById(id);
    if(!tourDetail) {
      res.json({
        code: "error",
        message: "Tour không tồn tại!",
      })
      return;
    }
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
    req.body.updatedBy = res.locals.account.id;
    await Tour.findByIdAndUpdate(id, req.body);

    res.json({
      code: "success",
      message: "Chỉnh sửa tour thành công!"
    })

  } catch(error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.deletePatch = async (req, res) => {
  try {
    const id = req.params.id;
    const tourDetail = await Tour.findById(id);
    if(!tourDetail) {
      res.json({
        code: "error",
        message: "Tour không tồn tại!",
      })
      return;
    }
    await Tour.findByIdAndUpdate(id, {
      deleted: true,
      deletedBy: res.locals.account.id,
      deletedAt: Date.now(),
    });

    res.json({
      code: "success",
      message: "Đã xóa tour!"
    })

  } catch(error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.restorePatch = async (req, res) => {
  try {
    const id = req.params.id;
    const tourDetail = await Tour.findById(id);
    if(!tourDetail) {
      res.json({
        code: "error",
        message: "Tour không tồn tại!",
      })
      return;
    }
    await Tour.findByIdAndUpdate(id, {
      deleted: false,
    });

    res.json({
      code: "success",
      message: "Đã khôi phục!"
    })

  } catch(error) {
    console.log("Lỗi: " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!",
    })
  }
}

module.exports.changeMultiPatch = async (req, res) => {
  try {
    const adminId = res.locals.account.id;
    const { listId, option } = req.body;

    switch (option) {
      case "active":
      case "inactive":
        await Tour.updateMany({
          _id: { 
            $in: listId
          }
        }, {
          status: option,
          updatedBy: adminId,
          updatedAt: Date.now(),
        })
        res.json({
          code: "success",
          message: "Đã cập nhật trạng thái!"
        })
        break;
      case "delete":
        await Tour.updateMany({
          _id: { 
            $in: listId
          }
        }, {
          deleted: true,
          deletedBy: adminId,
          deletedAt: Date.now(),
        })
        res.json({
          code: "success",
          message: "Đã xóa!"
        })
        break;
      default:
        res.json({
          code: "error",
          message: "Hành động không hợp lệ!"
        })
        break;
    }
    
  } catch (error) {
    console.log("lỗi " + error);
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}