const express = require('express');
const Router = express.Router();
const customerModel = require('../models/customers');

Router.get('/all',(req,res)=>{
    customerModel.getCustomers(req,res);
});

Router.post('/',(req,res)=>{
    customerModel.createCustomer(req,res)
});

module.exports = Router;