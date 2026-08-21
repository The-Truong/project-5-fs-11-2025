const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    email: String,
    otp: String,
    expireAt: 
    { 
      type: Date,
      expires: 0,
    },
  },
  { 
    timestamps: true
  }
);

// biến sẽ đại diện cho model
const ForgotPassword = mongoose.model('ForgotPassword', schema, 'forgot-password');

module.exports = ForgotPassword;