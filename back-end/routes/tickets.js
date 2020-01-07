const express = require('express')
const router = express.Router()
const tickets = require('../models/tickets')

//get ticket by ticketNumber
router.get('/:ticketNumber', async (req, res) => {
        const tick = await tickets.findOne({
            ticketNumber: req.params.ticketNumber
        })
        res.json(tick)
})

//update ticket. add next steps to this
router.put('/:ticketNumber', async (req, res) => {
        const tick = await tickets.findOne({
            ticketNumber: req.params.ticketNumber
        })
        for (let b in req.body) {
            tick[b] = req.body[b];
        }
        tick.save()
        res.json(tick)
})

router.delete('/:ticketNumber', async (req, res) => {
        const tick = await tickets.findOne({
            ticketNumber: req.params.ticketNumber
        })
        tick.delete()
        res.send('Ticket number: ' + req.params.ticketNumber + ' deleted.')
})

//get all open tickets
router.get('/', async (req, res) => {
    let p = false
    let now = new Date()
    now.setDate(now.getDate() - 7)
        if (req.query.project !== 'true') {
            const ticks = {
                //add under 7 days query
                open: addAge(await tickets.find({
                    closedAt: null,
                    createdAt: {
                        $gte: now.toISOString()
                    },
                    project: false
                })),
                //add 7 day query
                sevenDays: addAge(await tickets.find({
                    closedAt: null,
                    createdAt: {
                        $lte: now.toISOString()
                    },
                    project: false
                }))
            }
            res.json(ticks)
        } else {
            const ticks = addAge(await tickets.find({
                closedAt: null,
                project: true
            }))
            res.json(ticks)
        }
})

//create a ticket
router.post('/', async (req, res) => {
    //get next ticket number
    const tickNum = await tickets.findOne().sort({
        ticketNumber: -1
    })

    const newTicket = new tickets({
        ticketNumber: tickNum.ticketNumber + 1,
        callerName: req.body.callerName,
        assignedEng: req.body.assignedEng,
        problem: req.body.problem,
        subject: req.body.subject,
        solution: req.body.solution,
        project: req.body.project
    });
    console.log(newTicket)
        await newTicket.save()
        res.status(201).json(newTicket)
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