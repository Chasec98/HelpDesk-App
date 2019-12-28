const express = require('express')
const router = express.Router()
const tickets = require('../models/tickets')

//get ticket by ticketNumber
router.get('/:ticketNumber', async (req, res) => {
    try {
        const tick = await tickets.findOne({
            ticketNumber: req.params.ticketNumber
        })
        res.json(tick)
    } catch {

    }
})

//update ticket. add next steps to this
router.put('/:ticketNumber', async (req, res) => {
    try {
        const tick = await tickets.findOne({
            ticketNumber: req.params.ticketNumber
        })
        for (let b in req.body) {
            tick[b] = req.body[b];
        }
        tick.save()
        res.json(tick)
    } catch {
        res.status(500).send('Failed to update ticket')
    }
})

router.delete('/:ticketNumber', async (req, res) => {
    try {
        const tick = await tickets.findOne({
            ticketNumber: req.params.ticketNumber
        })
        tick.delete()
        res.send('Ticket number: ' + req.params.ticketNumber + ' deleted.')
    } catch {

    }
})

//get all open tickets
router.get('/', async (req, res) => {
    let now = new Date()
    now.setDate(now.getDate()-7)
    try {
        const ticks = {
            //add under 7 days query
            open: addAge(await tickets.find({
                closedAt: null,
                createdAt: {$gte: now.toISOString()}
            })),
            //add 7 day query
            sevenDays: addAge(await tickets.find({
                closedAt: null,
                createdAt: {$lte: now.toISOString()}
            }))
        }
        res.json(ticks)
    } catch {
        console.log('query error')
    }
})

//create a ticket
router.post('/', async (req, res) => {
    const newTicket = new tickets({
        ticketNumber: req.body.ticketNumber,
        callerName: req.body.callerName,
        assignedEng: req.body.assignedEng,
        problem: req.body.problem,
        subject: req.body.subject,
        solution: req.body.solution
    });
    console.log(newTicket)
    try {
        await newTicket.save()
        res.status(201).json(newTicket)
    } catch {
        console.log('failed post')
    }
})

function addAge(arr){
    const now = new Date()
    for(let i = 0; i < arr.length; i++){
        let date = new Date(arr[i].createdAt)
        arr[i].age = Math.floor(((now.getTime() - date.getTime()) / (1000 * 3600 * 24)))
    }
    return arr
}

module.exports = router