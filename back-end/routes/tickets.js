const express = require('express')
const router = express.Router()
const ticketModel = require('../models/tickets')
const tickets = ticketModel.mong

router.get('/all',(req,res)=>{
    ticketModel.getAllTickets(req,res);
})

router.get('/:ticketNumber', async (req, res) => {
    res.json(await ticketModel.getTicket(req.params.ticketNumber))
})

router.delete('/:ticketNumber', async (req, res) => {
    res.json(await ticketModel.deleteTicket(req.params.ticketNumber))
})

router.put('/:ticketNumber', async (req, res) => {
    ticketModel.updateTicket(req,res)
})

router.post('/', async (req, res) => {
    ticketModel.createTicket(req,res)
})

//get all open tickets
router.get('/', async (req, res) => {
    let now = new Date()
    now.setDate(now.getDate() - 7)
        const ticks = {
            //add under 7 days query
            open: addAge(await tickets.find({
                closedAt: null,
                createdAt: {
                    $gte: now.toISOString()
                },
                project: false,
                $or:[
                    {assignedEng: req.session.engId},
                    {escalationEng: req.session.engId}
                ]
            })),
            //add 7 day query
            sevenDays: addAge(await tickets.find({
                closedAt: null,
                createdAt: {
                    $lte: now.toISOString()
                },
                project: false
            })),
            project: addAge(await tickets.find({
                closedAt: null,
                project: true,
                $or:[
                    {assignedEng: req.session.engId},
                    {escalationEng: req.session.engId}
                ]
            }))
        }
        res.json(ticks)
})


function addAge(arr) {
    const now = new Date()
    for (let i = 0; i < arr.length; i++) {
        let date = new Date(arr[i].createdAt)
        arr[i].age = Math.floor(((now.getTime() - date.getTime()) / (1000 * 3600 * 24)))
    }
    return arr
}

module.exports = router