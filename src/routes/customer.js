const router = require('express').Router();
const Crypto = require('crypto-js');
const Customer = require('../models/Customer');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

router.post('/create', async (req,res) => {
	try{
		const {first_name,last_name,nationality,state,city,mobile,email} = req.body;
		const newCustomer = new Customer({
			first_name,
			last_name,
			nationality,
			state,
			city,
			mobile,
			email
		});
		const customer = await newCustomer.save();
		res.status(200).json(customer)
	}catch(err){
	  res.status(500).json({err_message:err.message})
	}
})

router.put('/:id/transfer', async (req,res) => {
	 // const {amount,to,account_id} = req.body;
	try{
	   const senderAccount = await Account.findById(req.params.id);
	 const recevierAccount = await Account.findById(req.body.account_id);
	   if(req.params.id !== senderAccount.id ){
	   	  return res.status(403).json({err_message:'Invalid account Id...'});
	   }else{
	   	  if(recevierAccount.id !== req.body.account_id){
	   	  	return res.status(403).json({err_message:'Wrong account number'})
	   	  }else{
	   	  	  if(req.body.amount <= senderAccount.account_balance){
	   	  	  	 senderAccount.account_balance -= req.body.amount;
	   	  	  	 recevierAccount.account_balance += req.body.amount;
	   	  	  	 /*
				    to update the sender account balance when the money is successfully withdraw 
				    and deposited into the reciever account 
	   	  	  	 */
	   	  	  	 const sender = await Account.findByIdAndUpdate(req.params.id,{
	   	  	  	 	$set:{
	   	  	  	 	  account_balance:senderAccount.account_balance
	   	  	  	 	}
	   	  	  	 },{new:true});

	   	  	  	 /*
	   	  	  	    to update the reciever account balance when the money is successfully deposited into the account  
				    and successfull withdraw from the sender account 
	   	  	  	 */ 
	   	  	  	 const reciever = await Account.findByIdAndUpdate(req.body.account_id,{
	   	  	  	 	$set:{
	   	  	  	 	  account_balance:recevierAccount.account_balance
	   	  	  	 	}
	   	  	  	 },{new:true});

	   	  	  const senderInfo = await Customer.findById(senderAccount.customer_id);
	   	  	  const recieverInfo = await Customer.findById(recevierAccount.customer_id);

	   	  	  	  const newTransaction = new Transaction({
	   	  	  	  	account_id:req.params.id,
	   	  	  	  	transaction_type:req.body.type,
	   	  	  	  	from_account_id:senderAccount.id,
	   	  	  	  	to_account_id:recevierAccount.id,
	   	  	  	  	amount:req.body.amount,
	   	  	  	  })
	   	  	  	  const trans = await newTransaction.save();
	   	  	  	  res.status(200).json({success_msg:`The Sum of ${req.body.amount} is successfully transfer to ${recieverInfo.last_name} ${recieverInfo.first_name}`})
	   	  	  }

	   	  	   if(req.body.amount > senderAccount.account_balance){
	   	  	  	  res.status(200).json({success_msg:"Insufficient fund..."})
	   	  	  }
	   	  }
	   }
	}catch(err){
	  res.status(500).json(err.message)
	}
});


router.get('/:id/account-balance', async (req,res) => {
  try{
  	const account = await Account.findById(req.params.id);
  	if(req.params.id !== account.id){
  		res.status(403).json({err_message:'Wrong Account Id'})
  	}else{
  		res.status(200).json({success_msg:`Your account balance is ${account.account_balance}`})
  	}
  }catch(err){
  	 res.status(500).json({err_message:err.message});
  }
})

router.get('/:id/bank-statement', async (req,res) => {
	const customerAccount = await Account.findById(req.params.id);
	try{
	  if(req.params.id === customerAccount.id){
	  	const trans = await Transaction.findOne({account_id:req.params.id});
	   res.status(200).json(trans);
	  }
	}catch(err){
		res.status(500).json({err_message:err.message})
	}
})

module.exports = router;