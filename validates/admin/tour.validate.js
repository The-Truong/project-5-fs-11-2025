const Joi = require('joi');

module.exports.createPost = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "string.empty" : "Vui lòng nhập tên tour!",
      }),
    category: Joi.string().allow(''),
    position: Joi.number().allow(''),
    status: Joi.string().allow(''),
    avatar: Joi.string().allow(''),
    priceAdult: Joi.number().allow(''),
    priceChildrent: Joi.number().allow(''),
    priceBaby: Joi.number().allow(''),
    priceNewAdult: Joi.number().allow(''),
    priceNewChildrent: Joi.number().allow(''),
    priceNewBaby: Joi.number().allow(''),
    stockAdult: Joi.number().allow(''),
    stockChildrent: Joi.number().allow(''),
    stockBaby: Joi.number().allow(''),
    locations: Joi.string().allow(''),
    time: Joi.string().allow(''),
    vehicle: Joi.string().allow(''),
    departureDate: Joi.date().allow(''),
    information: Joi.string().allow(''),
    schedules: Joi.string().allow(''),
  })

  const { error } = schema.validate(req.body);

  if(error){
    res.json({
      code: "error",
      message: error.details[0].message
    })
    return;
  }
  next();
}
