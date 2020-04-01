const mongoose = require('mongoose');

const mong = mongoose.connection;
const roles = mong.collection('roles');

function getRole(req,res){
    roles.findOne({
        roleId: req.session.roleId
    }).then((resp,err)=>{
        res.json(resp);
    })
}

module.exports = {
    getRole:getRole
}