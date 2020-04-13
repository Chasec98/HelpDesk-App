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
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    preferences:{
        type: Object,
        required: false
    },
    roleId:{
        type: Number,
        required: true,
        default: 1
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    paging:{
        type: Boolean,
        required: true,
        default: false
    }
})

let us = mongoose.model('users',users)
/////////////////////////////////////////////
//CRUD functions

async function updateUser(req,res){
    let user = await us.findOne({
        engId: req.params.userId
    })
    for(let b in req.body){
        if(b == 'password'){
            continue;
        }
        user[b] = req.body[b]
    }
    if(req.body['password'] != ''){
        user['password'] = req.body['password']
    }
    user.__v = user.__v + 1
    user.save()
    console.log("user " + req.body.username + " updated")
    res.json(user)
}

async function getUsers(req,res){
    let users = await us.find({
        active: true
    })
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
        roleId: req.body.roleId
    });

    await newUser.save().catch((err)=>{
        res.status(401).send(err.message)
    }).then(res.status(201).json(newUser));

}

async function deactivateUser(req,res){
    const userID = await us.findOne({
        engId: req.params.engId
    })

    userID.active = false;
    userID.save()
    this.getUser(req,res)

}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deactivateUser,
    updateUser
}