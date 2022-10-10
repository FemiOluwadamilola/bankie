const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
	first_name:{
		type:String,
		required:true
	},
	last_name:{
		type:String,
		required:true
	},
	nationality:{
	   type:String,
	   required:true
	},
	state:{
	 type:String,
	 required:true
	},
	city:{
	  type:String,
	  required:true
	},
	mobile:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	}
},{timestamp:true});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;