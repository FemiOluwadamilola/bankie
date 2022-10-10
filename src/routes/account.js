const router = require('express').Router();
const Crypto = require('crypto-js');
const Account = require('../models/Account');
const Customer = require('../models/Customer');
router.post('/create', async (req,res) => {
	try{
		const {customer_id,Account_type,currency} = req.body;
		const newAccount = new Account({
			 customer_id,
			 Account_type,
			 currency
		});
		const account = await newAccount.save();
		res.status(200).json(account)
	}catch(err){
	  res.status(500).json({err_message:err.message})
	}
})

module.exports = router;