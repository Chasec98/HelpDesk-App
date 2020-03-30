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
    }
})

let us = mongoose.model('users',users)
/////////////////////////////////////////////
//CRUD functions
async function getSelf(req,res){

}

async function getPrefs(req,res){
    let user = await us.findOne({
        username: req.session.username    
    })
    user = JSON.stringify(user)
    user = JSON.parse(user)
    res.json(user['preferences'])
}

module.exports = {
    getSelf:getSelf,
    getPrefs:getPrefs
}