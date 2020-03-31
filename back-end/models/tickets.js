//mongoose schema
const mongoose = require('mongoose')
const tickets = new mongoose.Schema({
    ticketNumber: {
        type: Number,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: false
    },
    callerName: {
        type: String,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    closedAt: {
        type: Date,
        required: false,
        default: null
    },
    ackTime: {
        type: Date,
        required: false
    },
    assignedEng: {
        type: Number,
        required: false
    },
    nextSteps: {
        type: Array,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    project: {
        type: Boolean,
        required: true,
        default: false
    }
})
let ticks = mongoose.model('tickets', tickets)
/////////////////////////////////////////////////

//CRUD functions
async function getTicket(num){
    let t = await ticks.findOne({
        ticketNumber: num
    })
    return t
}

async function deleteTicket(num){
    let t = await ticks.findOne({
        ticketNumber: num
    })
    t.delete()
    console.log('Ticket number '+ num + ' deleted.')
}

async function updateTicket(req,res){
    const tick = await ticks.findOne({
        ticketNumber: req.params.ticketNumber
    })
    for (let b in req.body) {
        tick[b] = req.body[b];
    }
    tick.__v = tick.__v + 1
    tick.save()
    res.json(tick)
}

async function createTicket(req, res){
    //get next ticket number
    const tickNum = await ticks.findOne().sort({
        ticketNumber: -1
    })
    const newTicket = new ticks({
        ticketNumber: tickNum.ticketNumber + 1,
        callerName: req.body.callerName,
        assignedEng: req.body.assignedEng,
        problem: req.body.problem,
        subject: req.body.subject,
        solution: req.body.solution,
        project: req.body.project,
        assignedEng: req.session.engId
    });
    await newTicket.save().catch((err)=>{
        res.status(401).send(err.message)
    })
    res.status(201).json(newTicket)
}

////////////////////////////////////////////////////



//Helper functions
function addAge(arr) {
    const now = new Date()
    for (let i = 0; i < arr.length; i++) {
        let date = new Date(arr[i].createdAt)
        arr[i].age = Math.floor(((now.getTime() - date.getTime()) / (1000 * 3600 * 24)))
    }
    return arr
}
//////////////////////////////////////////////////

module.exports = {
    mong: ticks,
    getTicket: getTicket,
    deleteTicket: deleteTicket,
    updateTicket: updateTicket,
    createTicket:createTicket
}