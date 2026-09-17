const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    fullName: String,
    email: String,
    phone: String,
    role: String,
    positionCompany: String,
    status: String, //inactive, active, initial
    password: String,
    avatar: String,
    createdBy: String,
    updatedBy: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: String,
    deletedAt: Date,
  },
  { 
    timestamps: true //tự động sinh ra trường createdAt và updatedAt
  }
);

// biến sẽ đại diện cho model
const AccountAdmin = mongoose.model('AccountAdmin', schema, 'account-admin');

module.exports = AccountAdmin;