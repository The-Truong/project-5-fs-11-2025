const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
  fullName: String,
  email: String,
  password: String,
  status: String, //inactive, active, initial
});

// biến sẽ đại diện cho model
const AccountAdmin = mongoose.model('AccountAdmin', schema, 'account-admin');

module.exports = AccountAdmin;