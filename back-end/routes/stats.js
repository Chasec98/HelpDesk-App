const express = require('express')
const Router = express.Router()
const ticketModel = require('../models/tickets')
const stats = ticketModel.mong

Router.get('/numClosed', async (req, res) => {
    const result = {}
    let now = new Date()
        now.setDate(now.getDate()-1)
        result['closed1day'] = await stats.find({
            assignedEng: req.session.engId,
            closedAt: {
                $gte: now
            }
        }).count()
        now.setDate(now.getDate()-6)
        result['closed7days'] = await stats.find({
            assignedEng: req.session.engId,
            closedAt: {
                $gte: now
            }
        }).count() 
        now.setDate(now.getDate()-23)
        result['closed30days'] = await stats.find({
            assignedEng: req.session.engId,
            closedAt: {
                $gte: now
            }
        }).count() 
        res.json(result)
})

module.exports = Router