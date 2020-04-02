const express = require('express')
const router = express.Router()
const roleModel = require('../models/roles')

router.get('/',(req,res)=>{
    roleModel.getRole(req,res)
})

router.get('/all',(req,res)=>{
    roleModel.getRoles(req,res)
})

module.exports = router;