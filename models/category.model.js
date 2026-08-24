const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    name: String,
    parent: String,
    position: Number,
    status: String,
    avatar: String,
    description: String,
    createdBy: String,
    updatedBy: String,
  },
  { 
    timestamps: true //tự động sinh thêm trường createAt và updateAt
  }
);

// biến sẽ đại diện cho model
const Category = mongoose.model('Category', schema, 'categories');

module.exports = Category;