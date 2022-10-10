const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
  customer_id:{
  	 type:String,
  	 required:true
  },
  account_balance:{
  	 type:Number,
  	 default:1000
  },
  Account_type:{
  	 type:String,
  	 required:true
  },
  currency:{
  	type:String,
  	required:true
  }
},{timestamp:true});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;