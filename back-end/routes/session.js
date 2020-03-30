const express = require('express')
const Router = express.Router()
const loginModel = require('../models/session')

Router.get('/',async (req, res) => {
    let result = {
        'id':req.sessionID,
        'user':req.session.username,
        'engID':req.session.engId,
        'validTill':req.session.expires
    };
    res.send(result);
});

Router.post('/login',async(req,res)=>{
    loginModel.login(req, res);
});

Router.post('/logout',async(req,res)=>{
    loginModel.logout(req,res);
});

module.exports = Router