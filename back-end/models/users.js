//mongoose schema
const mongoose = require('mongoose')
const users = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    engId:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    preferences:{
        type: Object,
        required: false
    },
    manager:{
        type: Boolean,
        required: true,
        default: false
    },
    roleId:{
        type: Number,
        required: true,
        default: 1
    }
})

let us = mongoose.model('users',users)
/////////////////////////////////////////////
//CRUD functions

async function getUsers(req,res){
    let users = await us.find({})
    for(var i = 0; i < users.length; i++){
        users[i]['password'] = '';
    }
    res.json(users)
}

async function getUser(req,res){
    let user = await us.findOne({
        engId: req.session.engId
    })
    user['password'] = ""
    res.json(user);
}

async function createUser(req,res){
    const userID = await us.findOne().sort({
        engId: -1
    });

    const newUser = new us({
        fname: req.body.fname,
        lname: req.body.lname,
        engId: userID.engId + 1,
        username: req.body.username,
        password: req.body.password,
        manager: req.body.manager
    });

    await newUser.save().catch((err)=>{
        res.status(401).send(err.message)
    }).then(res.status(201).json(newUser));

}

module.exports = {
    createUser:createUser,
    getUsers:getUsers,
    getUser:getUser
}