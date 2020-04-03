const mongoose = require('mongoose')

async function login(req,res){
    const db = mongoose.connection
    const usersCollection = db.collection('users')
    let user = await usersCollection.findOne({
        username: req.body.username
    })
    if(user.password == req.body.password && user.active == true){
        req.session.username = user.username
        req.session.engId = user.engId;
        req.session.roleId = user.roleId;
        res.send(user.username)
        console.log(user.username+' logged in')
    }
    else{
        res.status(401).send("password incorrect")
        console.log('incorrect login')
    }
}

async function logout(req,res){
    console.log(req.session.username+' logged out')
    req.session.destroy()
}

module.exports = {
    login:login,
    logout:logout
}