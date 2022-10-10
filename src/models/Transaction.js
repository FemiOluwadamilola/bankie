const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  account_id:{
  	 type:String,
  	 required:true
  },
  transaction_type:{
  	type:String,
  	required:true
  },
  from_account_id:{
  	type:String,
  	required:true
  },
  to_account_id:{
  	type:String,
  	required:true
  },
  amount:{
  	type:Number,
  	required:true
  }
},{timestamp:true});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;