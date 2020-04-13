const mongoose = require('mongoose');
const roles = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roleId: {
        type: Number,
        required: true
    },
    pages: {
        type: Array,
        required: true
    },
    hardware: {
        type: Boolean,
        required: true
    },
    software: {
        type: Boolean,
        required: true
    },
    escalation: {
        type: Number,
        required: true
    }
})

let rol = mongoose.model('roles',roles)

function getRole(req,res){
    rol.findOne({
        roleId: req.session.roleId
    }).then((resp,err)=>{
        res.json(resp);
    })
}

function getRoles(req,res){
    rol.find().then((resp)=>{
        res.json(resp)
    })
}

module.exports = {
    getRole:getRole,
    getRoles:getRoles
}