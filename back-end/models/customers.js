const mongoose = require('mongoose');
const customers = new mongoose.Schema({
    customerId: {
        type: Number,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

let cust = mongoose.model('customers',customers);

async function getCustomers(req,res){
    res.json(await cust.find({
        active: true
    }));
};

async function createCustomer(req,res){
    const lastCustomer = await cust.findOne().sort({
        customerId: -1
    });
    const newCustomer = new cust({
        fname: req.body.fname,
        lname: req.body.lname,
        fullName: req.body.fname + " "+ req.body.lname,
        customerId: lastCustomer.customerId + 1
    });
    return await newCustomer.save().catch((err)=>{
        res.status(401).send(err.message)
    }).then(res.status(201).json(newCustomer));
}

module.exports = {
    getCustomers,
    createCustomer
}