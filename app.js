const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const customerRoute = require('./src/routes/customer');
const accountRoute = require('./src/routes/account');
const app = express();
const PORT = process.env.PORT||5000;

// require('dotenv').config();

const DB_url = "mongodb://127.0.0.1:27017/bankie";
mongoose.connect(DB_url).then(() => console.log('Database connected...')).catch(err => console.log(err.message))

// express middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes
app.use('/api/customer', customerRoute);
app.use('/api/account', accountRoute);

app.listen(PORT, () => console.log('App running fine!!!'))