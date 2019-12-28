const mongoose = require('mongoose')

const tickets = new mongoose.Schema({
    ticketNumber: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: false
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
        required: true
    },
    nextSteps: {
        type: Array,
        required: false
    },
    age: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('tickets', tickets)