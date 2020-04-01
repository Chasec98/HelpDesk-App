//to display all user data. displays prefs and settings etc. if the user is logged in


const express = require('express')
const Router = express.Router()
const usersModel = require('../models/users')

Router.get('/all', async (req,res)=>{
    usersModel.getUsers(req,res)
})

Router.get('/', async(req,res)=>{
    usersModel.getUser(req,res)
})

Router.post('/new', async(req,res)=>{
    usersModel.createUser(req,res);
})

module.exports = Router