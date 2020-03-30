//to display all user data. displays prefs and settings etc. if the user is logged in


const express = require('express')
const Router = express.Router()
const usersModel = require('../models/users')
const users = usersModel

Router.get('/preferences', async (req,res)=>{
    users.getPrefs(req,res)
})

module.exports = Router